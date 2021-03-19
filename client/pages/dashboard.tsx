import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { isBrowser } from "./_app";

const addTest = gql`
  mutation Mutation($first: String!, $second: String!, $tok: String!) {
    addAbTest(first: $first, second: $second, tok: $tok) {
      id
      first
      second
    }
  }
`;

const nukeAllTestResults = gql`
  mutation Mutation($tok: String!) {
    nukeAllTestResults(tok: $tok) {
      id
    }
  }
`;

const Dashboard = (props, state) => {
  const router = useRouter();

  const [addAbTest] = useMutation(addTest);
  const [nukeData] = useMutation(nukeAllTestResults);

  if (props.username == undefined || props.token == undefined) {
    setTimeout(() => router.replace("/"), 2000);
    return (
      <a className="m-8 px-25 py-25 flex items-center text-lg uppercase font-bold leading-snug text-black hover:opacity-75">
        Not logged in
      </a>
    );
  }

  const handleBack = () => router.replace("/");
  const handleSubmit = async (event) => {
    console.log("In handle submit");
    event.preventDefault();
    console.log("button pressed");

    const first = async () => new URL(event.target.first.value);
    const second = async () => new URL(event.target.second.value);

    const urls = await Promise.all([first(), second()]).catch(alert);
    if (!urls) return;
    if (
      urls
        .map((url) => url.protocol === "http:" || url.protocol === "https:")
        .filter((x) => x == true).length != 2
    ) {
      alert(`urls len != 2`);
      return;
    }

    const response = await addAbTest({
      variables: {
        first: urls[0],
        second: urls[1],
        tok: props.token,
      },
    }).finally(() => {
      alert(`added entry`);
      event.target.first.value = null;
      event.target.second.value = null;
    })
    .catch(console.error)
    ;
    console.log(response);

    console.log("In handle submit");
  };
  const nukeAll = async () => {
    if (!isBrowser()) return;
    const confirmRes = confirm(
      "Are you sure you want to delete all collected data?"
    );
    if (!confirmRes) {
      console.log("user pressed no to confirm");
      return;
    }
    const response = await nukeData({ variables: { tok: props.token } }).catch(
      console.error
    );
    localStorage.setItem("taint", "true");
    console.log(response);
  };
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
      <button
        className="m-2 bg-red-600 hover:bg-red-700 text-white font-light py-2 px-6 rounded focus:outline-none focus:shadow-outline"
        onClick={nukeAll}
      >
        Nuke all
      </button>
    </div>
  );
};

Dashboard.getInitialProps = (ctx) => {
  if (!isBrowser()) return { username: "", token: "" };
  return {
    username: localStorage.getItem("username"),
    token: localStorage.getItem("token"),
    privilege: localStorage.getItem("privilege"),
  };
};

export default Dashboard;
