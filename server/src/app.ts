import { ApolloServer, gql } from "apollo-server";

import resolvers from "./resolver"
import typeDefs from "./typedefs"
import authserver from "./authserv";

//Serverside entry point

//Apollo server provides GraphQL
const server: ApolloServer = new ApolloServer({ typeDefs, resolvers });

//Start both servers
Promise.all(
  [
    server.listen().then(({ url }) => console.log(`🚀 Dataserver ready at ${url}`)),
    //AuthServer for REST logins, using expressjs
    authserver().then(x => console.log(`🚀 Authserver loaded port 3005 `))

  ]
).catch(console.error).finally(() => console.log(`Loaded`))



