import { ApolloServer, gql } from "apollo-server";

import resolvers from "./resolver"
import typeDefs from "./typedefs"
import authserver from "./authserv";
const server: ApolloServer = new ApolloServer({ typeDefs, resolvers });
Promise.all(
  [

    server.listen().then(({ url }) => {
      console.log(`🚀  Server ready at ${url}`);
    }),
    authserver().then(x => console.log("authserver loaded"))

  ]
).catch(console.error).finally(() => {console.log("Shutting down")})
