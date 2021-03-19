import { isBrowser, apolloClient } from "./_app";
import { useQuery, gql } from "@apollo/client";
import { pseudoRandomBytes } from "node:crypto";
import { useRouter } from "next/router";

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
    <div className={"content-start"}>
      <p>
        Id: {props.id} <br /> Total votes :{" "}
        {props.resultFirst + props.resultSecond}{" "}
      </p>
      <br />
      <div>
        <img className={"object-cover  sm:w-40  lg:w-48 lg:h-48 "} src={props.first} />
        <a>Total: {props.resultFirst}</a>
        <br />
        <a>
          Percent: {((props.resultFirst / props.resCount) * 100.0).toFixed(2)}%
        </a>
      </div>
      <div>
        <img className={"object-cover  sm:w-40 lg:w-48 lg:h-48"} src={props.second} />
        <a>Total: {props.resultSecond}</a>
        <br />
        <a>
          Percent: {((props.resultSecond / props.resCount) * 100.0).toFixed(2)}%
        </a>
      </div>
      <br />
      <p>
        Average decision time : {(props.millis / props.resCount).toFixed(2)} ms
      </p>
    </div>
  );
};

const ResultsFrame = (props, state) => {
  const router = useRouter();
  const handleBack = () => router.replace("/");
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
    collection.push(
      <div className="flex content-center items-center">
        <div
          className={
            "mx-5 my-5  max-w-lg rounded overflow-hidden shadow-lg container border  "
          }
        >
          <div
            key={res.id}
            className={"flex container items-center space-x-3 content-center"}
          >
            <ResultElement
              id={test.id}
              first={test.first}
              second={test.second}
              millis={res.millis}
              resCount={res.resCount}
              resultFirst={res.resultFirst}
              resultSecond={res.resultSecond}
            />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <button
        onClick={handleBack}
        className="  m-2 bg-indigo-600 hover:bg-blue-700 text-white font-light py-2 px-6 rounded focus:outline-none focus:shadow-outline"
      >
        Back
      </button>
      <div className="grid sm:grid-cols-3 lg:grid-cols-6 content-start">{collection} </div>
    </div>
  );
};

ResultsFrame.getInitialProps = async ctx => {
  
}
export default ResultsFrame;
