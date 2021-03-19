import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import * as dotenv from "dotenv";
import Login from "./login";
import Link from "next/link";

import * as _ from "lodash";

const isBrowser = () => typeof window !== "undefined";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { useCookies } from "react-cookie";
import React from "react";

//Component for login bar when not logged in
const NotLoggedInBar: () => any = () => {
  return (
    <a className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-white">
      Home
    </a>
  );
};
//Component for login bar when logged in
const LoggedInBar = () => {
  if (!isBrowser()) return null;
  return (
    <a className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-white">
      {localStorage.getItem("username")}
    </a>
  );
};

//HomeBar component controls the top part of the screen on index page
const HomeBar = (props) => {
  if (!isBrowser()) return <NotLoggedInBar />; 
  if (props.username == null) return <NotLoggedInBar />;
  return <LoggedInBar />;
};

//Main page
const Home = (props, state) => {
  state = {
    token: props.token,
    username: props.username,
    privilege: props.privilege,
    ...state,
  };
  if (isBrowser()) {
    state = {
      token: localStorage.getItem("token"),
      username: localStorage.getItem("username"),
      privilege: localStorage.getItem("privilege"),
      ...state,
    };
  }
  console.log("home start");

  //This component chooses whether to display a login or logout button in the header
  const LoginLogout = (props, state) => {
    if (props.username == undefined || props.username == null)
      return <Link href={"/login"}>Login</Link>;
    return <Link href={"/logout"}>Logout</Link>;
  };

  //This determines the visibility of the dashboard link
  const AdminDashboardLink = (props) => {
    if (props.privilege == "admin")
      return (
        <div>
          <li className="nav-item">
            <a className="px-5 py-4 flex items-center text-ms uppercase font-bold leading-snug text-white hover:opacity-75">
              <Link href={"/dashboard"}>Admin</Link>
            </a>
          </li>
        </div>
      );
    //If not admin go away
    return null;
  };

  //This controls the account options link
  const AccountOptionsLink = (props) => {
    //If not logged in go away
    if (props.username == null || props.username == undefined) return null;
    return (
      <div>
        <li className="nav-item">
          <a className="px-5 py-4 flex items-center text-ms uppercase font-bold leading-snug text-white hover:opacity-75">
            <Link href={"/account"}>Account</Link>
          </a>
        </li>
      </div>
    );
  };
  return (
    <div className="flex flex-wrap py-2">
      <div className="w-full px-4">
        <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-pink-500 rounded">
          <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
            <div className="w-full relative flex justify-between lg:w-auto px-4 lg:static lg:block lg:justify-start">
              {/* HomeBar at the top of the screen contains main UI elements */}
              <HomeBar username={state.username} token={state.token} />
              <button
                className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                type="button"
              >
                <span className="block relative w-6 h-px rounded-sm bg-white"></span>
                <span className="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
                <span className="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
              </button>
            </div>
            <div
              className="flex lg:flex-grow items-center"
            >
              <ul className="flex flex-col lg:flex-row list-none ml-auto">
                <li className="nav-item">
                  <a className="px-5 py-4 flex items-center text-ms uppercase font-bold leading-snug text-white hover:opacity-75">
                    {/*Link to the start of the AB tests*/}
                    <Link href={"/choose/1"}>Start</Link>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="px-5 py-4 flex items-center text-ms uppercase font-bold leading-snug text-white hover:opacity-75">
                    {/*Link to results page*/}
                    <Link href={"/results"}>Results</Link>
                  </a>
                </li>
                {/*Admin page element*/}
                <AdminDashboardLink privilege={state.privilege} />
                <AccountOptionsLink
                  username={state.username || props.username}
                  token={state.token || props.token}
                />
                <li className="nav-item">
                  <a className="px-5 py-4 flex items-center text-ms uppercase font-bold leading-snug text-white hover:opacity-75">
                    <LoginLogout username={state.username || props.username} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

Home.getInitialProps = (ctx) => {
  console.log("initial props");
  //If server side rendering, return unspecialised props
  if (!isBrowser()) return { token: null, username: null };
  //else return props from browser local storage
  return {
    token: localStorage.getItem("token"),
    username: localStorage.getItem("username"),
    privilege: localStorage.getItem("privilege"),
  };
};
export default Home;
