import { gql } from "apollo-server";

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


  type Mutation { 
    setAbTestResult(
      userId : Int!
      testId: Int!
      resultfirst: Int!
      resultsecond: Int!
      millis : Int !
    ): ABTestResult


    abTestChoice(id: Int!, choice: String!): ABTestResult
    

  }


  type Query {
    getAbTest(id: Int!, tok: String!): ABTestEntry
    getAllAbTests(tok : String!): [ABTestEntry]
    getAbTestResult(id: Int!): ABTestResult
    getAllAbTestResults: [ABTestResult]
  }
`;
export default typeDefs;
