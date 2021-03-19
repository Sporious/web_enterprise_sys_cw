import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { isBrowser } from "./_app";

//GraphQL mutation for adding tests
const addTest = gql`
  
  mutation Mutation($first: String!, $second: String!, $tok: String!) { 
    addAbTest(first: $first, second: $second, tok: $tok) {
      id
      first
      second
    }
  }
`;

//GraphQL mutation for removing all test results
const nukeAllTestResults = gql`
  mutation Mutation($tok: String!) {
    nukeAllTestResults(tok: $tok) {
      id
    }
  }
`;

//Dashboard page component
const Dashboard = (props, state) => {
  const router = useRouter();

  //this provides a callback to execute the actual query, without breaking Reacts laws of hooks
  const [addAbTest] = useMutation(addTest);
  const [nukeData] = useMutation(nukeAllTestResults);

  if (props.username == undefined || props.token == undefined) {
    //if not logged in properly
    setTimeout(() => router.replace("/"), 2000); //Go back to index after 2s
    //Show go away message
    return (
      <a className="m-8 px-25 py-25 flex items-center text-lg uppercase font-bold leading-snug text-black hover:opacity-75">
        Log in to access
      </a>
    );
  }
  //Back button callback
  const handleBack = () => router.replace("/");
  //AddABsTest  submit callback
  const handleSubmit = async (event) => {
    console.log("In handle submit");
    event.preventDefault();
    console.log("button pressed");

    // Using async and Promise.all here because try catch is unergonomic
    const first = async () => new URL(event.target.first.value);
    const second = async () => new URL(event.target.second.value);
    const urls = await Promise.all([first(), second()]).catch(alert);
    if (!urls) return;
    if (
      //are both entries valid HTTP/HTTPS URLs
      urls
        .map((url) => url.protocol === "http:" || url.protocol === "https:")
        .filter((x) => x == true).length != 2
    ) {
      //else alert user of error
      alert(`urls len != 2`);
      return;
    }

    //If inputs are valid, use graphQL mutation declared above to create new ABTest
    const response = await addAbTest({
      variables: {
        first: urls[0],
        second: urls[1],
        tok: props.token,
      },
    })
    // Then clear the input boxes to show to user something has happened + avoid duplicate input
      .finally(() => {
        alert(`added entry`);
        event.target.first.value = null;
        event.target.second.value = null;
      })
      //And if there's an error throw it on console
      .catch(console.error);
    console.log(response);

    console.log("In handle submit");
  };


  //This callback is for the delete all results button which clears the results for all tests
  const nukeAll = async () => {
    if (!isBrowser()) return; 
    const confirmRes = confirm(
      "Are you sure you want to delete all collected data?"
    ); //Prompt user for verification for this dangerous action
    if (!confirmRes) { 
      console.log("user pressed no to confirm");
      return;
    }
    //If ok send the graphQL mutation
    const response = await nukeData({ variables: { tok: props.token } }).catch(
      console.error
    );

    //Our local caches will be invalidated, graphQL will show wrong results trying to be smart and caching
    //localStorage taint key is used to force repopulate the results without cache
    localStorage.setItem("taint", "true");
    console.log(response);
  };
  //Return the html
  return (
    <div className="container rounded  border-gray-500 appearance-none ">
      <button
        onClick={handleBack}
        className="m-2 bg-indigo-600 hover:bg-blue-700 text-white font-light py-2 px-6 rounded focus:outline-none focus:shadow-outline"
      >
        Back
      </button>
      <br />
      <p className="m-2 px-25 py-25 flex items-center text-lg uppercase font-bold leading-snug text-black hover:opacity-75">
        Add new test:
      </p>
      <form onSubmit={handleSubmit}>
        <label className="m-2">URL of first image</label>
        <input
          className="m-3 w-full bg-drabya-gray border-gray-500 appearance-none border p-4 font-light leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="first"
          id=""
          placeholder="first"
        />
        <label className="m-2">URL of second image</label>
        <input
          className="m-3 w-full bg-drabya-gray border-gray-500 appearance-none border p-4 font-light leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="second"
          id=""
          placeholder="second"
        />

        <input
          type="submit"
          className="m-2 bg-indigo-600 hover:bg-blue-700 text-white font-light py-2 px-6 rounded focus:outline-none focus:shadow-outline"
          value="Add test"
        ></input>
      </form>

      <br />
      <br />
      <br />

      <label className="m-2 px-25 py-25 flex items-center text-lg uppercase font-bold leading-snug text-black hover:opacity-75">
        Nuke all result data (this will delete all collected data and cannot be
        reversed):
      </label>
      {/* Red buttons are dangerous actions*/}
      <button
        className="m-2 bg-red-600 hover:bg-red-700 text-white font-light py-2 px-6 rounded focus:outline-none focus:shadow-outline"
        onClick={nukeAll}
      >
        Nuke all
      </button>
    </div>
  );
};
//Get initial props
Dashboard.getInitialProps = (ctx) => {
  if (!isBrowser()) return { username: "", token: "" };
  return {
    username: localStorage.getItem("username"),
    token: localStorage.getItem("token"),
    privilege: localStorage.getItem("privilege"),
  };
};

export default Dashboard;
