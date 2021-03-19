import { gql } from "apollo-server";

const typeDefs = gql`
  type ABTestEntry {
    id: Int!
    first: String
    second: String
  }
  type ABTestResult {
    id: Int!
    resultFirst: Int!
    resultSecond: Int!
    millis : Int!
    resCount : Int!
  }
  type Mutation { 
    setAbTestResult(
      userId : Int!
      testId: Int!
      resultFirst: Int!
      resultSecond: Int!
      millis : Int !
      resCount : Int !
    ): ABTestResult
    abTestChoice(id: Int!, choice: String!, millis : Int!, tok : String!): ABTestResult


    addAbTest(first: String!, second: String!, tok: String!) : ABTestEntry



    nukeTestResult(id : Int!, tok: String!) : ABTestResult

    nukeAllTestResults( tok : String!) : [ABTestResult]

  }


  type Query {
    getAbTest(id: Int!, tok: String!): ABTestEntry
    getAllAbTests(tok : String!): [ABTestEntry]
    getAbTestResult(id: Int!): ABTestResult
    getAllAbTestResults: [ABTestResult]
  }
`;
export default typeDefs;
