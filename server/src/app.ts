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

  const salt = await bcrypt.genSalt(10);
  // now we set user password to hashed password
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    //is there an account to update
    let record = await prisma.accounts.findFirst({
      where: { uuid: req.params.uuid },
    });
    if (record) {

      let updated = await prisma.accounts.update({
        //match on uuid from request params
        where: { uuid: req.params.uuid },
        data: { username, hashedPassword, salt },
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
    id: Int!
    first: String
    second: String
  }

  type ABTestResult { 
    id: Int!
    resultfirst : Int!
    resultsecond : Int!
  }

  type Query {
    getAbTest(id: Int!): ABTestEntry
    getAllAbTests: [ABTestEntry]
    getAbTestResult(id: Int!): ABTestResult 
    setAbTestResult(id: Int!, resultfirst: Int!, resultsecond: Int!) : ABTestResult
    getAllAbTestResults : [ABTestResult]
    abTestChoice(  id : Int!, choice : String!) : ABTestResult
  }
`;

//resolvers define functions to handle graphql queries
const resolvers = {
  Query: {
    getAbTest: async (parent, args) => {
      console.log(args.id);
      try {
        const abtest = await prisma.abtest.findFirst({
          where: { id: parseInt(args.id) },
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
        return abtests;
      } catch (err) {
        console.log(err);
        return err;
      }
    },
    setAbTestResult : async ( parent, args) => {
      console.log(args);
      try { 
        const abtestresult = await prisma.abtestresults.create({
          data : { id : args.id, resultfirst: args.resultfirst, resultsecond: args.resultsecond}
        });
        return abtestresult;

      }catch ( err) {
        console.log(err);
        return err;
      }
    },
    getAbTestResult : async ( parent, args) => { 
      console.log(args)
      try  { 
        const abtestresult = await prisma.abtestresults.findFirst({where : { id : args.id}})
        return abtestresult;
      }catch(err){return err;}
    },
    getAllAbTestResults : async ( ) => { 
      try { 
        const results = await prisma.abtestresults.findMany();
        return results;
      }catch(err) { return err;}
    },
    abTestChoice : async (parent, args )  => { 
      console.log( args) ;
      try {
          const abTest = await prisma.abtestresults.findFirst({where : { id : args.id}});
          const deletion = await prisma.abtestresults.delete({where : { id : args.id }});
          const insertion = await prisma.abtestresults.create({ data : { 
            resultfirst: abTest.resultfirst,
            resultsecond: abTest.resultsecond,
            id : abTest.id
          }});
          return insertion;
      } catch (err) {return err;}
    } 

  },
};
const server: ApolloServer = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
