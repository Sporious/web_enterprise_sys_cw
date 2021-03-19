import { gql } from "@apollo/client";
import { useRouter } from "next/router";
import { isBrowser } from "./_app";

//Account page
const AccountPage = (props, state) => {

  //NextJS router allows controlling the URL bar and redirecting
  const router = useRouter();

  //If we press back, return to index
  const handleBack = () => router.replace("/");

  //Callback to delete account
  const deleteMyAccount = async (event) => {

    event.preventDefault();
    //Validate the user wants to delete their account
    const ok = confirm("Continue?");
    if ( !ok) { return;}
    //Send request to the auth server, path is proxied by routes set in next.config.js
    const response = await fetch("/auth/deleteuser", {
      body: JSON.stringify({
        //Provide the token to identify the user
        tok: props.tok,
      }),
      method: "DELETE", //REST method
      headers: { "Content-Type": "application/json" } //Body is JSON encoded,
    });


    console.log(response);
    alert("Success?");
    localStorage.clear(); //Account deleted, clear up client localstorage
    setTimeout( () => router.replace("/"), 1000); //Redirect to index after 1000ms
    return;
  };
  if (
    props.username == null ||
    props.username == undefined ||
    props.token == null ||
    props.token == undefined||
    props.privilege == null || props.privilege == undefined
  ) {
    setTimeout(() => router.replace("/"), 2000);
    return (
      <a className="m-8 px-25 py-25 flex items-center text-lg uppercase font-bold leading-snug text-black hover:opacity-75">
        Not logged in
      </a>
    );
  } else {
    return (
      <div>
        <button
        onClick={handleBack}
        className="m-2 bg-indigo-600 hover:bg-blue-700 text-white font-light py-2 px-6 rounded focus:outline-none focus:shadow-outline"
      >
        Back
      </button>
      <br />
        <label className="m-2 px-25 py-25 flex items-center text-lg uppercase font-bold leading-snug text-black hover:opacity-75">
          Delete my account (cannot be reversed)
        </label>
        <button
          className="m-2 bg-red-600 hover:bg-red-700 text-white font-light py-2 px-6 rounded focus:outline-none focus:shadow-outline"
          onClick={deleteMyAccount}
        >
          Delete my account
        </button>
      <p  className="m-2 px-25 py-25 flex items-center text-lg uppercase font-bold leading-snug text-black hover:opacity-75 " >User account level: { props.privilege}</p>
      </div>
    );
  }
};

AccountPage.getInitialProps = (ctx) => {
  //If SSR return generic props
  if (!isBrowser()) return {};
  return {
    username: localStorage.getItem("username"),
    token: localStorage.getItem("token"),
    privilege : localStorage.getItem("privilege")
  };
};

export default AccountPage;
