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
    return (

        <div>
            <div>
                <a>Home</a>
                <Link href="/login">
                    <a>Login</a>
                </Link>
                <Link href={"/choose/1"}>
                    <a>Choose</a>
                </Link>
                <Link href={"/choose/2"}>
                    <a>Choose</a>
                </Link>
            </div>
            <RenderTestRow/>

        </div>
    )
}


export default Home;





