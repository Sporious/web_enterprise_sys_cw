import { isBrowser } from "./_app";

const Dashboard = (props, state) => {








  return (

      <div className="container rounded  border-gray-500 appearance-none">
          <p className="m-2 px-25 py-25 flex items-center text-lg uppercase font-bold leading-snug text-black hover:opacity-75">Add new test:</p>
    <form>
      <label className="m-2">URL of first image</label>
      <input
        className="m-3 w-full bg-drabya-gray border-gray-500 appearance-none border p-4 font-light leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        name=""
        id="first"
        placeholder="first"
      />
      <label className="m-2">URL of second image</label>
      <input
        className="m-3 w-full bg-drabya-gray border-gray-500 appearance-none border p-4 font-light leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        name=""
        id="second"
        placeholder="second"
      />

      <button type="submit" className="m-2 bg-indigo-600 hover:bg-blue-700 text-white font-light py-2 px-6 rounded focus:outline-none focus:shadow-outline" >Add test</button>
    </form></div>
  );
};

Dashboard.getInitialProps = ctx => {
  if (!isBrowser()) return { username: "", token: "" };
  return {
    username: localStorage.getItem("username"),
    token: localStorage.getItem("token"),
  };
};

export default Dashboard;
