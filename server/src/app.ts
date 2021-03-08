import {ApolloServer, gql} from "apollo-server";

// const typeDefs = gql`
//     # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
//
//     # This "Book" type defines the queryable fields for every book in our data source.
//     type Book {
//         title: String
//         author: String
//     }
//
//     # The "Query" type is special: it lists all of the available queries that
//     # clients can execute, along with the return type for each. In this
//     # case, the "books" query returns an array of zero or more Books (defined above).
//     type Query {
//         books: [Book]
//     }
// `;


const typeDefs = gql`

    type ABTestEntry {
        cid : ID!,
        first  : String,
        second : String,
    }

    type Query  {
        ab(cid: ID!) : ABTestEntry
        abs : [ABTestEntry]
    }

`;
// const books = [
//     {
//         title: 'The Awakening',
//         author: 'Kate Chopin',
//     },
//     {
//         title: 'City of Glass',
//         author: 'Paul Auster',
//     },
// ];
// const resolvers = {
//     Query: {
//         books: () => books,
//     },
// };

const abTestDummies = [
    {
        cid: "1",
        first: "https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png",
        second: "https://ichef.bbci.co.uk/news/976/cpsprodpb/12A9B/production/_111434467_gettyimages-1143489763.jpg"
    },
    {
        cid: "2",
        second: "https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png",
        first: "https://ichef.bbci.co.uk/news/976/cpsprodpb/12A9B/production/_111434467_gettyimages-1143489763.jpg"
    }
]


const resolvers = {
    Query: {
        ab : (parent, args ) => {
            console.log(args.cid);
            return abTestDummies.find(x => x.cid == args.cid);
        },
        abs() { return abTestDummies}
    }
}
const server
    :
    ApolloServer = new ApolloServer({typeDefs, resolvers});
server.listen().then(({url}) => {
    console.log(`🚀  Server ready at ${url}`);
});