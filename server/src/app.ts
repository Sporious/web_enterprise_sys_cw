import { ApolloServer, gql } from "apollo-server";

import bcrypt from "bcrypt";

import * as jwt from "jsonwebtoken";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


// async function main() {
//   const allAccounts = await prisma.accounts.findMany();

//   console.log(allAccounts);
// }

// main()
//   .catch((e) => {
//     throw e;
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

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
      },
    });

     const val = await jwt.sign({ username }, process.env.SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) { console.log(err) };
      console.log( { username :user.username, token});
      return res.json( { username: user.username, token } );
    });

  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
});
//read
expressApplication.get("/allusers", async (req, res) => {


  const tok = req.body.tok;
  const r = jwt.verify(tok, process.env.SECRET, async (err, authorisedData) => {
    if (err) {
      console.log('ERROR: Could not connect to the protected route');
      res.sendStatus(403);
    }
    else {
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
expressApplication.delete("/deleteuser/:id", async (req, res) => {
  try {
    let record = await prisma.accounts.delete({
      where: { id: parseInt(req.params.id) },
    });
    return res.json(record);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
});




//login
expressApplication.post("/login", async (req, res) => {
  console.log(JSON.stringify(req.body));
  const body = req.body;
  const user = await prisma.accounts.findUnique({
    where: { username: body.username },
  });
  if (user) {
    const validPassword = await bcrypt.compare(
      body.password,
      user.hashedPassword
    );
    if (validPassword) {
      //todo
      const token = jwt.sign({ username: body.username }, process.env.SECRET, { expiresIn: '1h' }, (err, token) => {
        if (err) { console.log(err) };
        res.send( { username : body.username ,  token } );
      });
    } else {
      return res.status(400).json({ message: "invalid pass" });
    }
  }
  else {
    return res.status(400).json({ message: "account does not exist" });
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
    testId : Int!
    userId : Int!
    resultfirst: Int!
    resultsecond: Int!
    millis : Int!
  }

  type Query {
    getAbTest(id: Int!, tok: String!): ABTestEntry
    getAllAbTests(tok : String!): [ABTestEntry]
    getAbTestResult(id: Int!): ABTestResult
    setAbTestResult(
      userId : Int!
      testId: Int!
      resultfirst: Int!
      resultsecond: Int!
      millis : Int !
    ): ABTestResult

    getAllAbTestResults: [ABTestResult]
    abTestChoice(id: Int!, choice: String!): ABTestResult
  }
`;


const validate = fx => async args => await jwt.verify(args.tok, process.env.SECRET, async (err, authorised) => {
  if (err) { return err }
  else {
    return await fx(authorised);
  }
})


//resolvers define functions to handle graphql queries
const resolvers = {
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
    abTestChoice: async (parent, args) => {
      console.log(args);
      try {
        const abTest = await prisma.abtestresults.findFirst({
          where: { id: args.id },
        });
        const deletion = await prisma.abtestresults.delete({
          where: { id: args.id },
        });
        const insertion = await prisma.abtestresults.create({
          data: {
            resultFirst: abTest.resultFirst,
            resultSecond: abTest.resultSecond,
            testId: abTest.testId,
            userId: abTest.userId,
            millis: abTest.millis
          },
        });
        return insertion;
      } catch (err) {
        return err;
      }
    },
  },
};
const server: ApolloServer = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
