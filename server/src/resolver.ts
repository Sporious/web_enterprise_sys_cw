import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

//Connect to prisma and postgresql
const prisma = new PrismaClient();

//This function executes a callback after checking for a valid user account
const validate = (fx) => async (args) => {
  console.error("in validate");
  return jwt.verify(args.tok, process.env.SECRET, async (err, authorised) => { //Check user auth
    if (err) {
      console.error(err);
      return err;
    } else {
      return await fx(authorised); //if ok pass though and await callback
    }
  });
};

//This function can be used inside validate to check for superuser access / admin access
const adminOnly = (fx) => async (user) => {
  const username = user.username;
  if (!username) throw "no username";
  const account = await prisma.accounts.findFirst({ where: { username } }); //Check that user privilege is admin
  if (account && account.privilege == "admin") return await fx(user);
  throw "user is not an admin";
};


//These are the GraphQL resolvers
//This provides functions to resolve and handle the queries and mutations defined in the GraphQL schema in typedefs.ts
const resolvers = {
  //A mutation can change/add/delete records
  Mutation: {
    //  addAbTest(first: String!, second: String!, tok: String!) : ABTestEntry
    //      adds a new AB test to the system at the end of the list
    addAbTest: async (parent, args) =>
      validate( //Check logged in
        adminOnly(async (admin) => { //Check logged in user is admin
          console.log(`admin authed ${admin.username}`);
          return await prisma.abtest
            .create({ data: { first: args.first, second: args.second } })
            .catch( e => console.error ( `error creating test ${e}`)); //Add the AB test to the abtest model with prisma
        })
      )(args) //invoke on args, function is curried
      ,
      //nukeAllTestResults( tok : String!) : [ABTestResult]
      //  Reset specific test result by id
    nukeTestResult: async (parent, args) =>
      validate(
        adminOnly(async (admin) => {
          console.log(`admin authed ${admin.username}`);
          const val = await prisma.abtestresults
            .upsert({
              where: { id: args.id },
              update: {
                resCount: 0,
                resultFirst: 0,
                resultSecond: 0,
                millis: 0,
              },
              create: {
                millis: 0,
                resCount: 0,
                resultFirst: 0,
                resultSecond: 0,
              },
            })
            .catch(console.error);
          console.log(val);
          return val;
        })
      )(args),

    //nukeAllTestResults( tok : String!) : [ABTestResult]
    //  deletes all test results regardless of test or user
    nukeAllTestResults: async (parent, args) => {
      validate(
        adminOnly(async (admin) => { //Requires admin
          return await prisma.abtestresults.deleteMany().catch(console.error);
        })
      )(args);
    },
    //Set the result for a test
    setAbTestResult: async (parent, args) => {
      console.log(args);
      return;
    },

    //abTestChoice(id: Int!, choice: String!, millis : Int!, tok : String!): ABTestResult
    //  Create a choice for a test
    abTestChoice: async (parent, args) => {
      console.log(args);

      return await validate(async (authed) => { //ensure logged in
        try {
          const record = await prisma.abtestresults.findFirst({
            where: { id: args.id },
          });
          if (record) {
            //update existing record
            switch (args.choice) {
              case "first":
                return await prisma.abtestresults.update({
                  where: { id: args.id },
                  data: {
                    resultFirst: record.resultFirst + 1,
                    resCount: record.resCount + 1,
                    millis: record.millis + args.millis,
                  },
                });
              case "second":
                return await prisma.abtestresults.update({
                  where: { id: args.id },
                  data: {
                    resultSecond: record.resultSecond + 1,
                    resCount: record.resCount + 1,
                    millis: record.millis + args.millis,
                  },
                });
              default:
                console.log("invalid choice");
            }
          } else {
            //create record if does not exist
            if (args.id == null || args.choice == null || args.millis == null)
              throw "bad request";
            switch (args.choice) {
              case "first":
                return await prisma.abtestresults.create({
                  data: {
                    id: args.id,
                    resultFirst: 1,
                    resultSecond: 0,
                    millis: args.millis,
                    resCount: 1,
                  },
                });

              case "second":
                return await prisma.abtestresults.create({
                  data: {
                    id: args.id,
                    resultFirst: 0,
                    resultSecond: 1,
                    millis: args.millis,
                    resCount: 1,
                  },
                });
              default:
                console.log("invalid choice");
            }
          }
        } catch (e) {
          console.log(e);
          return e;
        }
        return "Some other error";
      })(args);
    },
  },

  //Queries are GraphQL actions that are read-only
  Query: {
    //getAbTest(id: Int!, tok: String!): ABTestEntry
    //  get AB test from server
    getAbTest: async (parent, args) => {
      return await validate(async (authed) => {
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
      })(args);
    },
   //getAllAbTests(tok : String!): [ABTestEntry]
    //  Get all the AB tests as a set
    getAllAbTests: async (parent, args) => {
      return await validate(async (authed) => { //ensure logged in
        console.log("jwt:", args.tok);
        try {
          const abtests = await prisma.abtest.findMany();//get all tests
          console.log(abtests);
          return abtests;
        } catch (err) {
          console.log(err);
          return err;
        }
      })(args);
    },
    //get result for specific test
    getAbTestResult: async (parent, args) => {
      console.log(args);
      try {
        const abtestresult = await prisma.abtestresults.findFirst({
          where: { id: args.id },
        });
        return abtestresult;
      } catch (err) {
        return err;
      }
    },
    //get result for all AB tests as set
    getAllAbTestResults: async () => {
      try {
        const results = await prisma.abtestresults.findMany(); //Find any result regardless of criteria
        return results;
      } catch (err) {
        return err;
      }
    },
  },
};

export default resolvers;
