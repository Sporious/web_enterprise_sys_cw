import { useRouter } from "next/router";
import { isBrowser } from "./_app";

const AccountPage = (props, state) => {
  const router = useRouter();
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
    return (<div> 
        <p>Hello world</p>

    </div>);
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
