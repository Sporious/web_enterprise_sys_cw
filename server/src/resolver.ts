import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const validate = fx => async args => await jwt.verify(args.tok, process.env.SECRET, async (err, authorised) => {
  if (err) { return err }
  else {
    return await fx(authorised);
  }
})
const resolvers = {
    Mutation: {
  
      setAbTestResult: async (parent, args) => {
        console.log(args);
  
        return await validate(async authed => {
  
          try {
  
            const abtestresult = await prisma.abtestresults.create({
              data: {
                testId: args.testId,
                userId: args.userId,
                resultFirst: args.resultFirst,
                resultSecond: args.resultSecond,
                millis: args.millis
              },
            });
            return abtestresult;
          } catch (err) {
            console.log(err);
            return err;
          }
  
        });
      },
      abTestChoice: async (parent, args) => {
        console.log(args);
        
        
        try  {



   //         prisma.abtestresults.upsert( )

        }

        catch(e) { 
            console.log(e);
            return e; 

        }



      },
    },
    Query: {
      getAbTest: async (parent, args) => {
        return await validate(async authed => {
          try {
            const abtest = await prisma.abtest.findFirst({
              where: { id: parseInt(args.id) }
            });
            console.log(abtest);
            return abtest;
          } catch (err) {
            console.log(err);
            return err;
          }
        })(args);
      },
      getAllAbTests: async (parent, args) => {
        return await validate(async authed => {
          console.log("jwt:", args.tok);
          try {
            const abtests = await prisma.abtest.findMany();
            console.log(abtests);
            return abtests;
          } catch (err) {
            console.log(err);
            return err;
          }
        })(args);
      },
  
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
      getAllAbTestResults: async () => {
        try {
          const results = await prisma.abtestresults.findMany();
          return results;
        } catch (err) {
          return err;
        }
      },
  
    },
  };


 export default resolvers; 