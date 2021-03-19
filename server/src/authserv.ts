import bcrypt from "bcrypt";
import express, { json } from "express";
import { PrismaClient } from "@prisma/client";

import * as jwt from "jsonwebtoken";
const prisma = new PrismaClient();

const authserver = async () => {
  //users
  const expressApplication = express();
  expressApplication.use(express.json());

  //create
  expressApplication.post("/create", async (req, res) => {
    const { username, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      const existingUser = await prisma.accounts.findFirst({
        where: { username },
      });
      if (existingUser) {
        throw { name: "Account exists" };
      }

      const user = await prisma.accounts.create({
        data: {
          username,
          hashedPassword,
        },
      });
      const randomData = crypto.getRandomValues(new Uint32Array(10));
      const val = await jwt.sign(
        { username, randomData },
        process.env.SECRET,
        { expiresIn: "24h" },
        (err, token) => {
          if (err) {
            console.log(err);
          }
          console.log({ username: user.username, token });
          return res.json({ username: user.username, token, privilege : user.privilege });
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

    //check if blacklisted
    
    const onBlacklist = await prisma.jwtblacklist.findFirst({where: {jwt: tok}}).catch(console.error);
    if (onBlacklist) return res.status(400).json({error : "on blacklist"})


    const r = jwt.verify(
      tok,
      process.env.SECRET,
      async (err, authorisedData) => {
        if (err) {
          console.log("ERROR: Could not connect to the protected route");
          res.sendStatus(403);
        } else {
          try {
            const all_users = await prisma.accounts.findMany();
            return res.json(all_users);
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
    // now we set user password to hashed password
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      //is there an account to update
      let record = await prisma.accounts.findFirst({
        where: { id: parseInt(req.params.id) },
      });
      if (record) {
        let updated = await prisma.accounts.update({
          //match on uuid from request params
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

    const onBlacklist = await prisma.jwtblacklist.findFirst({where: {jwt: req.body.tok}}).catch(console.error);
    if (onBlacklist) return res.status(400).json({error : "on blacklist"})

     jwt.verify( req.body.tok, process.env.SECRET, async ( err, authed) => { 
       const { username} = authed;
      if (!username) return res.status(400).json({"error" : "no user"})
     try {

      //Delete the account
      const record = await prisma.accounts.deleteMany({
        where: { username },
      });
      console.log(record);
      //Issued JWT's are valid, no revokation possible; blacklist best solution

      const blacklisted = await prisma.jwtblacklist.create({data:{jwt: req.body.tok}});



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
    const user = await prisma.accounts.findFirst({
      where: { username: body.username },
    });
    console.log(user);
    if (user) {
      console.log(`body pass : ${body.password}`);
      const validPassword = await bcrypt.compare(
        body.password,
        user.hashedPassword
      );
      if (validPassword) {
        //todo
         jwt.sign(
          { username: body.username },
          process.env.SECRET,
          { expiresIn: "24h" },
          (err, token) => {
            if (err) {
              console.log(err);
            }
           return  res.json({ username: body.username, token, privilege : user.privilege || "user" });
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
