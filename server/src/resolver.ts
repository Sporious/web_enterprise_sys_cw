import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const validate = (fx) => async (args) =>
  await jwt.verify(args.tok, process.env.SECRET, async (err, authorised) => {
    if (err) {
      return err;
    } else {
      return await fx(authorised);
    }
  });
const resolvers = {
  Mutation: {
    setAbTestResult: async (parent, args) => {
      console.log(args);
      return;
    },
    abTestChoice: async (parent, args) => {
      console.log(args);

      return await validate(async (authed) => {
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
                    resCount: 0,
                  },
                });

              case "second":
                return await prisma.abtestresults.create({
                  data: {
                    id: args.id,
                    resultFirst: 0,
                    resultSecond: 1,
                    millis: args.millis,
                    resCount: 0,
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
  Query: {
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
    getAllAbTests: async (parent, args) => {
      return await validate(async (authed) => {
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
