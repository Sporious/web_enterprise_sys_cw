import { useRouter } from "next/router";
import { apolloClient, isBrowser } from "../_app";
import { gql, useMutation, useQuery } from "@apollo/client";

//graphQL mutation to make a choice for a test
const abTestChoice = gql`
  mutation Mutation($id: Int!, $tok: String!, $choice: String!, $millis: Int!) {
    abTestChoice(id: $id, choice: $choice, millis: $millis, tok: $tok) {
      id
      resultFirst
      resultSecond
      millis
      resCount
    }
  }
`;

//graphQL query to get all tests
const allAbs = gql`
  query Query {
    getAllAbTests {
      id
    }
  }
`;

//graphQL query  to get an AB test
const ab = gql`
  query Query($id: Int!, $tok: String!) {
    getAbTest(id: $id, tok: $tok) {
      id
      first
      second
    }
  }
`;
//Main page component
const ABTest = (props, state) => {
  const router = useRouter();
  if (!isBrowser()) return null;
  //If first render save id from router
  if (!state.id) {
    const { id } = router.query; //Get route [id] param from the router query
    state = {
      id,
      token: localStorage.getItem("token"),
      username: localStorage.getItem("username"),
      ...state,
    };
  }

  //No token go away, this is members only
  if (!state.token) {
    setTimeout(() => router.replace("/"), 2000); //return to index after 2s
    return (
      <a className="m-8 px-25 py-25 flex items-center text-lg uppercase font-bold leading-snug text-black hover:opacity-75">
        Log in to access
      </a>
    );
  }

  //get graphQL mutation callback
  const [makeChoice] = useMutation(abTestChoice);

  const startTime = new Date(); //This time determines the first oppertunity the user has to make the choice,
  //this is used to measure how quickly the user decides

  const tok = localStorage.getItem("token");

  //Callback for the choice button
  const abChoice = (id, choice) => async (event) => {
    const now = new Date(); //When was button pressed
    const difference = now.getTime() - startTime.getTime(); //How long since the option loaded
    try {
      //initialise graphQL mutation
      const result = await makeChoice({
        variables: { id, tok, choice, millis: difference },
      });
      console.log(result);
    } catch (e) {
      console.error(e);
    } finally {
      localStorage.setItem("taint", "true"); //Making a choice may invalidate our cache, this is used to force graphQL to reload
      //this one works without its just for safety

      router.replace(`/choose/${id + 1}`);  //Move to next AB test immediately
    }
  };
  //UI component for each AB choice
  const ABChoiceElementFromUrl = (props, state) => {
    return (
      <div className={"content-center"}>
        <img className={"object-cover h-48"} src={props.url} />
        <button
          onClick={abChoice(parseInt(props.id), props.choice)}
          className={
            "py-5  rounded text-white font-bold bg-blue-500 hover:bg-blue-700 container content-end"
          }
        >
          Select
        </button>
      </div>
    );
  };


  //use graphQL query to get AB test data from server
  const { loading, error, data } = useQuery(ab, {
    variables: {
      id: parseInt(state.id),
      tok: isBrowser() ? localStorage.getItem("token") : "",
    },
  });
  if (loading) return <p>Loading</p>;
  if (error) return <p>Error</p>;
  console.log(data.id);


    //Is there no test data available for this ID (aka are we at the end of the list)
  if (data.getAbTest == null) {
    //Finished presenting options to user, return to main page

    router.replace("/");
    return null;
  }

  return (
    <div className="grid-cols-3 flex block px-auto  items-center  ">
      <div
        className={
          "mx-5 my-5  max-w-lg rounded overflow-hidden shadow-lg container border w-100 "
        }
      >
        <div className={"flex container items-center space-x-3 content-center"}>
          <ABChoiceElementFromUrl
            url={data.getAbTest.first}
            choice={"first"}
            id={state.id}
          />
          <ABChoiceElementFromUrl
            url={data.getAbTest.second}
            choice={"second"}
            id={state.id}
          />
        </div>
      </div>
    </div>
  );
};

export default ABTest;
