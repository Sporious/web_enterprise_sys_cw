import '../styles/global.css'
import { ApolloProvider } from '@apollo/client';


//Initialise graphql client
export const apolloClient = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache()
});


import { ApolloClient, gql, InMemoryCache } from '@apollo/client';


//Function that returns true on browser and false on nodejs
export const isBrowser
    = () => typeof window !== "undefined"



    //App entry point
export default function App({ Component, pageProps }) {
    return (
            <ApolloProvider client={apolloClient}>
                {/*Serve the app with this graphql provider*/}
                <Component {...pageProps} />
            </ApolloProvider>
    );
}
