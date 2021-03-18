import { isBrowser, apolloClient } from "./_app";
import { useQuery, gql } from "@apollo/client";
import { pseudoRandomBytes } from "node:crypto";

const getData = gql`
  query Query($tok: String!) {
    getAllAbTestResults {
      id
      resultFirst
      resultSecond
      millis
      resCount
    }
    getAllAbTests(tok: $tok) {
      id
      first
      second
    }
  }
`;

const ResultElement = (props, state) => {
  if (
    props.first == undefined ||
    props.second == undefined ||
    props.millis == undefined ||
    props.resCount == undefined
  ) {
    console.log("some undefined");
    console.log(props);
    return null;
  }
  console.log(props);
  return (
    <div className={"content-center"}>
        <p>Id: {props.id}</p>
      <img className={"object-cover h-48"} src={props.first} />
      <img className={"object-cover h-48"} src={props.second} />
      <p>{(props.millis / props.resCount).toFixed(2)} ms</p>
    </div>
  );
};

const ResultsFrame = (props, state) => {
  if (!isBrowser()) return null;
  const token = localStorage.getItem("token");
  if (!token) return <p>Login to access this</p>;
  const { loading, error, data } = useQuery(getData, {
    variables: { tok: token },
  });
  if (loading) return <p>Loading</p>;
  if (error) return <p>Error</p>;

  let collection = [];
  for (let res of data.getAllAbTestResults) {
    let test = data.getAllAbTests.find((x) => x.id == res.id);
    if (!test) continue;
    return (
        <div className="grid-cols-5 flex block px-auto  items-center  ">
            <div className={"mx-5 my-5  max-w-lg rounded overflow-hidden shadow-lg container border w-200 "}>
      <div key={res.id} className={"flex container items-center space-x-3 content-center"}  >
        <ResultElement
            id={test.id}
          first={test.first}
          second={test.second}
          millis={res.millis}
          resCount={res.resCount}
        />
      </div></div></div>
    );
  }
};

export default ResultsFrame;
