import {GetStaticProps} from "next";
import {useRouter} from "next/router"
import {RenderTestRow} from "../pages/dashboard/see_ab_tests"
import * as dotenv from "dotenv";
import Login from "./login";
import Link from "next/link"

const isBrowser = () => typeof window !== "undefined"
import { ApolloClient, InMemoryCache } from '@apollo/client';



function Home(props, state) {


    const router = useRouter();
    const domain = props.domain;
    const clientId = props.clientId;
    console.log(JSON.stringify({domain, clientId}));
    // return (

    //     <div>
    //         <div>
    //             <a>Home</a>
    //             <Link href="/login">
    //                 <a>Login</a>
    //             </Link>
    //             <Link href={"/choose/1"}>
    //                 <a>Choose</a>
    //             </Link>
    //             <Link href={"/choose/2"}>
    //                 <a>Choose</a>
    //             </Link>
    //         </div>
    //         <RenderTestRow/>

    //     </div>
    // )


    return ( 
        <div className="flex flex-wrap py-2">
  <div className="w-full px-4">
    <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-pink-500 rounded">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto px-4 lg:static lg:block lg:justify-start">
          <a className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-white" href="#pablo">
              Home
          </a>
          <button className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none" type="button">
            <span className="block relative w-6 h-px rounded-sm bg-white"></span>
            <span className="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
            <span className="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
          </button>
        </div>
        <div className="flex lg:flex-grow items-center" id="example-navbar-info">
          <ul className="flex flex-col lg:flex-row list-none ml-auto">
            <li className="nav-item">
              <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" href="#pablo">
                  <Link href={"/choose/1"} >
                Start
                </Link>
              </a>
            </li>
            <li className="nav-item">
              <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" href="#pablo">
                Admin 
              </a>
            </li>
            <li className="nav-item">
              <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" href="#pablo">

                  <Link href={"/login"} >
                Login 
                </Link>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</div>

    )
}


export default Home;





