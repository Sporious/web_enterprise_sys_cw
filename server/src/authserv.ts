import bcrypt from "bcrypt";
import express, { json } from "express";
import { PrismaClient } from "@prisma/client";

import * as jwt from "jsonwebtoken";

//Prisma client provides ORM for PostgreSQL
const prisma = new PrismaClient();
const authserver = async () => {
  //users
  const expressApplication = express();
  expressApplication.use(express.json());

  //create
  expressApplication.post("/create", async (req, res) => {
    const { username, password } = req.body;

    //Salt makes passwords more resistant to rainbows and brute force
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password for safer storage
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      //Check this user isnt already signed up
      const existingUser = await prisma.accounts.findFirst({
        where: { username },
      });
      if (existingUser) {
        throw { name: "Account exists" }; //else error, dont want duplicate accounts
      }

      //Create the new user account
      const user = await prisma.accounts.create({
        data: {
          username,
          hashedPassword,
        },
      });
      const val = await jwt.sign(
        { username },
        process.env.SECRET, //load secret from .env
        { expiresIn: "24h" }, //JWT cannot be revoked so high expiry time is a threat
        (err, token) => {
          if (err) {
            console.log(err);
          }
          console.log({ username: user.username, token });
          return res.json({
            username: user.username,
            token,
            privilege: user.privilege,
          }); //Send token, username, user privilege level back to client
        }
      );
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  });
  //read
  expressApplication.get("/allusers", async (req, res) => {
    const tok = req.body.tok;

    //check if blacklisted JWT
    const onBlacklist = await prisma.jwtblacklist
      .findFirst({ where: { jwt: tok } })
      .catch(console.error);
    if (onBlacklist) return res.status(400).json({ error: "on blacklist" }); //This token belongs to a recently deleted user probably

    const r = jwt.verify(
      tok,
      process.env.SECRET,
      async (err, authorisedData) => {
        if (err) {
          console.log("ERROR: Could not connect to the protected route");
          res.sendStatus(403);
        } else {
          try {
            const allUsers = await prisma.accounts.findMany(); //Get all users
            return res.json(allUsers);
          } catch (err) {
            console.log(err);
            return res.status(400).json(err);
          }
        }
      }
    );
  });

  //update
  expressApplication.put("/updateuser/:uuid", async (req, res) => {
    //destructure request body
    const { username, password, newpass } = req.body;

    const salt = await bcrypt.genSalt(10);
    // now  set user password to hashed password
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      //is there an account to update
      let record = await prisma.accounts.findFirst({
        where: { id: parseInt(req.params.id) },
      });
      if (record) {
        let updated = await prisma.accounts.update({
          //match on id from request params
          where: { id: parseInt(req.params.id) },
          data: { username, hashedPassword },
        });

        return res.json(updated);
      } else {
        return res.status(400);
      }
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  });

  //delete
  expressApplication.delete("/deleteuser", async (req, res) => {
    //Blacklist check
    const onBlacklist = await prisma.jwtblacklist
      .findFirst({ where: { jwt: req.body.tok } })
      .catch(console.error);
    if (onBlacklist) return res.status(400).json({ error: "on blacklist" });

    //Validate JWT
    jwt.verify(req.body.tok, process.env.SECRET, async (err, authed) => {
      const { username } = authed;
      if (!username) return res.status(400).json({ error: "no user" });
      try {
        //Delete the account
        const record = await prisma.accounts.deleteMany({
          where: { username },
        });
        console.log(record);

        //Issued JWT's are valid, no revokation possible; denylist best solution
        //Insert this JWT into the denylist
        const blacklisted = await prisma.jwtblacklist.create({
          data: { jwt: req.body.tok },
        });

        //Return record information to user for debug purpose mostly
        return res.json(record);
      } catch (err) {
        console.log(err);
        return res.status(400).json(err);
      }
    });
  });

  //login
  expressApplication.post("/login", async (req, res) => {
    console.log(JSON.stringify(req.body));
    const body = req.body;

    //Find user with this username
    const user = await prisma.accounts.findFirst({
      where: { username: body.username },
    });
    console.log(user);

    if (user) {
      console.log(`body pass : ${body.password}`);

      //Use bcrypt to check password against hashed pass
      const validPassword = await bcrypt.compare(
        body.password,
        user.hashedPassword
      );
      if (validPassword) {
        //If valid generate a new JWT and send it and other user data back to client
        jwt.sign(
          { username: body.username },
          process.env.SECRET,
          { expiresIn: "24h" },
          (err, token) => {
            if (err) {
              console.log(err);
            }
            return res.json({
              username: body.username,
              token,
              privilege: user.privilege || "user",
            });
          }
        );
      } else {
        return res.status(400).json({ message: "invalid pass" });
      }
    } else {
      return res.status(400).json({ message: "account does not exist" });
    }
  });

  //start auth app
  expressApplication.listen(3005, () => {
    console.log("listening on 3005");
  });

  return expressApplication;
};

export default authserver;
