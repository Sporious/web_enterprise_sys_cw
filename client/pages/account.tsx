import { gql } from "@apollo/client";
import { useRouter } from "next/router";
import { isBrowser } from "./_app";

const AccountPage = (props, state) => {
  const router = useRouter();
  const deleteMyAccount = async (event) => {
    event.preventDefault();

    const response = await fetch("/auth/deleteuser", {
      body: JSON.stringify({
        tok: props.tok,
      }),
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });


    console.log(response);
    alert("Success?");
    localStorage.clear();
    setTimeout( () => router.replace("/"), 2000);
    return;
  };
  if (
    props.username == null ||
    props.username == undefined ||
    props.token == null ||
    props.token == undefined
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
        <label className="m-2 px-25 py-25 flex items-center text-lg uppercase font-bold leading-snug text-black hover:opacity-75">
          Delete my account (cannot be reversed)
        </label>
        <button
          className="m-2 bg-red-600 hover:bg-red-700 text-white font-light py-2 px-6 rounded focus:outline-none focus:shadow-outline"
          onClick={deleteMyAccount}
        >
          Nuke all
        </button>
      </div>
    );
  }
};

AccountPage.getInitialProps = (ctx) => {
  if (!isBrowser()) return {};
  return {
    username: localStorage.getItem("username"),
    token: localStorage.getItem("token"),
  };
};

export default AccountPage;
