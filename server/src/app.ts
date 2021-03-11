import { ApolloServer, gql } from "apollo-server";

import bcrypt from "bcrypt";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// A `main` function so that you can use async/await

async function main() {
  const allAccounts = await prisma.accounts.findMany();

  console.log(allAccounts);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import express, { json } from "express";

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
    const existing_user = await prisma.accounts.findFirst({
      where: { username },
    });
    if (existing_user) {
      throw { name: "Account exists" };
    }

    const user = await prisma.accounts.create({
      data: {
        username,
        hashedPassword,
        salt,
      },
    });
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
});
//read
expressApplication.get("/allusers", async (req, res) => {
  try {
    const all_users = await prisma.accounts.findMany();
    return res.json(all_users);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
});

//update
expressApplication.put("/updateuser/:uuid", async (req, res) => {
  //destructure request body
  const { username, password, newpass } = req.body;
  try {
    //is there an account to update
    let record = await prisma.accounts.findFirst({
      where: { uuid: req.params.uuid },
    });
    if (record) {

      let updated = await prisma.accounts.update({
        //match on uuid from request params
        where: { uuid: req.params.uuid },
        //todo implement pass hash
        data: { username, hashedPassword: newpass },
      });

      return res.json(updated);
    }
    else {return res.status(400)}
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
});

//delete
expressApplication.delete("/deleteuser/:uuid", async (req, res) => {
  try {

    let record = await prisma.accounts.delete({
      where: { uuid: req.params.uuid },
    });
    return res.json(record);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
});

//start auth app

expressApplication.listen(3005, () => {
  console.log("listening on 3005");
});

//gql app

const typeDefs = gql`
  type ABTestEntry {
    cid: ID!
    first: String
    second: String
  }

  type Query {
    getAbTest(cid: ID!): ABTestEntry
    getAllAbTests: [ABTestEntry]
  }
`;

// const abTestDummies = [
//   {
//     cid: "1",
//     first:
//       "https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png",
//     second:
//       "https://ichef.bbci.co.uk/news/976/cpsprodpb/12A9B/production/_111434467_gettyimages-1143489763.jpg",
//   },
//   {
//     cid: "2",
//     second:
//       "https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png",
//     first:
//       "https://ichef.bbci.co.uk/news/976/cpsprodpb/12A9B/production/_111434467_gettyimages-1143489763.jpg",
//   },
// ];


//
const resolvers = {
  Query: {
    getAbTest: async (parent, args) => {
      console.log(args.cid);
      try {
        const abtest = await prisma.abtest.findFirst({
          where: { id: parseInt(args.cid) },
        });
        console.log(abtest);
        return abtest;
      } catch (err) {
        console.log(err);
        return err;
      }
    },
    getAllAbTests: async () => {
      try {
        const abtests = await prisma.abtest.findMany();
        console.log(abtests);
        return abtests;
      } catch (err) {
        console.log(err);
        return err;
      }
    },
  
  },
};
const server: ApolloServer = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
