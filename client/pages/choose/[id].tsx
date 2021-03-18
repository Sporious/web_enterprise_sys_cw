import { useRouter } from "next/router";
import { apolloClient, isBrowser } from "../_app";
import { gql, useMutation, useQuery } from "@apollo/client";

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
const allAbs = gql`
  query Query {
    getAllAbTests {
      id
    }
  }
`;

const ab = gql`
  query Query($id: Int!, $tok: String!) {
    getAbTest(id: $id, tok: $tok) {
      id
      first
      second
    }
  }
`;
const ABTest = (props, state) => {


  const router = useRouter()
  //If first render save id from router
  if (!state.id) {
    const { id } = router.query;
    state = {
      id,
      ...state,
    };
  }

 
  const [makeChoice] = useMutation(abTestChoice);
  const startTime = new Date();

  



  if (!isBrowser()) return null;
  const tok = localStorage.getItem("token");

  const abChoice = (id, choice) => async (event) => {
    const now = new Date();
    const difference = now.getTime() - startTime.getTime();
    try {
      const result = await makeChoice({
        variables: { id, tok, choice, millis: difference },
      });
      console.log(result);
      alert("choice");
    } catch (e) {
      console.error(e);
    }
    finally { 
      router.replace(`/choose/${id + 1}`)
    }
  };
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

 const { loading, error, data } = useQuery(ab, {
    variables: {
      id: parseInt(state.id),
      tok: isBrowser() ? localStorage.getItem("token") : "",
    },
  });
  if (loading) return <p>Loading</p>;
  if (error) return <p>Error</p>;
  console.log(data.id);


  if (data.getAbTest == null) { 
    //Finished presenting options to user, return to main page

    router.replace("/")
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
          <ABChoiceElementFromUrl url={data.getAbTest.first} choice={"first"} id={state.id} />
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
