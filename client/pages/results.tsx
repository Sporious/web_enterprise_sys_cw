import { isBrowser, apolloClient } from "./_app";
import { useQuery, gql } from "@apollo/client";
import { pseudoRandomBytes } from "node:crypto";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

//graphQL queries to get all test results and to get all tests, relevant to the results page
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

//This is an individual element representing one test and result set
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
        {/*The total number of votes cast on this test*/}
        {props.resultFirst + props.resultSecond}{" "}
      </p>
      <br />
      <div>
        {/* here we use media queries through TailWindCSS to keep the screen usable on small screen devices  */}
        <img
          className={"object-cover  sm:w-40  lg:w-48 lg:h-48 "}
          src={props.first}
        />
        <a>Total: {props.resultFirst}</a> {/*Votes for this option*/}
        <br />
        <a>
          Percent: {((props.resultFirst / props.resCount) * 100.0).toFixed(2)}%{" "}
          {/* Round to 2 places for aesthetics */}
          {/*Percent of votes for first choice*/}
        </a>
      </div>
      <div>
        <img
          className={"object-cover  sm:w-40 lg:w-48 lg:h-48"}
          src={props.second}
        />
        <a>Total: {props.resultSecond}</a>
        <br />
        <a>
          Percent: {((props.resultSecond / props.resCount) * 100.0).toFixed(2)}%
        </a>
      </div>
      <br />
      <p>
        {/*Calculate average decision  */}
        Average decision time : {(props.millis / props.resCount).toFixed(2)} ms
      </p>
    </div>
  );
};
//Page element for displaying results
const ResultsFrame = (props, state) => {
  const router = useRouter();
  const handleBack = () => router.replace("/");
  if (!isBrowser()) return null;
  const token = localStorage.getItem("token");
  if (!token || token.length < 2)
    //ensure token exists and is valid, else go away
    return (
      <a className="m-8 px-25 py-25 flex items-center text-lg uppercase font-bold leading-snug text-black hover:opacity-75">
        Log in to access
      </a>
    );
  //Use query to get information from servr
  const { loading, error, data, refetch } = useQuery(getData, { //refetch callback allows manual cache flush for Apollo graphql client
    variables: { tok: token }, //load variables into query for execution
  });
  state = {
    isTainted: localStorage.getItem("taint") == "true", //load from localstorage into component state
    ...state,
  };
  if (loading) return <p>Loading</p>;
  if (error) return <p>Error</p>;

  //Vector of HTML elements to be rendered
  let collection = [];
  //Just going to ignore tests with no options selected from the results page,
  // iterating through results gets every test where at least 1 result has been recorded
  for (let res of data.getAllAbTestResults) {
    let test = data.getAllAbTests.find((x) => x.id == res.id);
    if (!test) continue; //Incase this result doesnt have a test, which would be weird so skip
    //populate collection vector with rendered elements
    collection.push(
      //
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
  if (state.isTainted) {
    console.log("is tainted refetching");
    refetch();
  }
  state = { collection, ...state };
  return (
    <div>
      <button
        onClick={handleBack}
        className="  m-2 bg-indigo-600 hover:bg-blue-700 text-white font-light py-2 px-6 rounded focus:outline-none focus:shadow-outline"
      >
        Back
      </button>
      <div className="grid sm:grid-cols-3 lg:grid-cols-6 content-start">
        {" "}
        {/*Use tailwindCSS media queries to show 6 columns of results on desktop devices and only 3 on smaller screens*/}
        {state.collection}{" "}
      </div>
    </div>
  );
};

export default ResultsFrame;
