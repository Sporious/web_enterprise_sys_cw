import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const validate = (fx) => async (args) => {
  console.error("in validate");
  return jwt.verify(args.tok, process.env.SECRET, async (err, authorised) => {
    if (err) {
      console.error(err);
      return err;
    } else {
      return await fx(authorised);
    }
  });
};
const adminOnly = (fx) => async (user) => {
  const username = user.username;
  if (!username) throw "no username";
  const account = await prisma.accounts.findFirst({ where: { username } });
  if (account && account.privilege == "admin") return await fx(user);
  throw "user is not an admin";
};

const resolvers = {
  Mutation: {
    // addAbTest: async (parent, args) => {
    //   console.log(`in addabtest`)
    //   validate( async authed => {

    //     console.log(`validated`)

    //     adminOnly( async admin => {
    //       console.log(`admin authed`)
    //     })(authed)
    //   })(args)
    addAbTest: async (parent, args) =>
      validate(
        adminOnly(async (admin) => {
          console.log(`admin authed ${admin.username}`);
          return await prisma.abtest
            .create({ data: { first: args.first, second: args.second } })
            .catch( e => console.error ( `error creating test ${e}`));
        })
      )(args),

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
    nukeAllTestResults: async (parent, args) => {
      validate(
        adminOnly(async (admin) => {
          return await prisma.abtestresults.deleteMany().catch(console.error);
        })
      )(args);
    },
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
