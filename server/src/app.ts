import { ApolloServer, gql } from "apollo-server";

import resolvers from "./resolver"
import typeDefs from "./typedefs"
import authserver from "./authserv";
const server: ApolloServer = new ApolloServer({ typeDefs, resolvers });
Promise.all(
  [
    server.listen().then(({ url }) => console.log(`🚀 Dataserver ready at ${url}`)),
    authserver().then(x => console.log(`🚀 Authserver loaded port 3005 `))

  ]
).catch(console.error).finally(() => console.log(`Loaded`))
