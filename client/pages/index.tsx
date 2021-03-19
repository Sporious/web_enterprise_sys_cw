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

const NotLoggedInBar: () => any = () => {
  return (
    <a className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-white">
      Home
    </a>
  );
};
const LoggedInBar = () => {
  if (!isBrowser()) return null;
  return (
    <a className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-white">
      {localStorage.getItem("username")}
    </a>
  );
};

const HomeBar = (props) => {
  if (!isBrowser()) return <NotLoggedInBar />;
  if (props.username == null) return <NotLoggedInBar />;
  return <LoggedInBar />;
};

const Home = (props, state) => {
  state = {
    token: props.token,
    username: props.username,
    ...state,
  };
  if (isBrowser()) {
    state = {
      token: localStorage.getItem("token"),
      username: localStorage.getItem("username"),
      ...state,
    };
  }
  console.log("home start");
  const LoginLogout = (props, state) => {
    if (props.username == undefined || props.username == null) return <Link href={"/login"}>Login</Link>;
    return <Link href={"/logout"}>Logout</Link>;
  };
  return (
    <div className="flex flex-wrap py-2">
      <div className="w-full px-4">
        <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-pink-500 rounded">
          <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
            <div className="w-full relative flex justify-between lg:w-auto px-4 lg:static lg:block lg:justify-start">
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
              id="example-navbar-info"
            >
              <ul className="flex flex-col lg:flex-row list-none ml-auto">
                <li className="nav-item">
                  <a className="px-5 py-4 flex items-center text-ms uppercase font-bold leading-snug text-white hover:opacity-75">
                    <Link href={"/choose/1"}>Start</Link>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="px-5 py-4 flex items-center text-ms uppercase font-bold leading-snug text-white hover:opacity-75">
                    Admin
                  </a>
                </li>
                <li className="nav-item">
                  <a className="px-5 py-4 flex items-center text-ms uppercase font-bold leading-snug text-white hover:opacity-75">
                    <LoginLogout  username={state.username}/>
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
  if (!isBrowser()) return { token: "", username: "" };
  return {
    token: localStorage.getItem("token"),
    username: localStorage.getItem("username"),
  };
};
export default Home;
