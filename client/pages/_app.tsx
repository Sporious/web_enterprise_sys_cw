import '../styles/global.css'
import { ApolloProvider } from '@apollo/client';
import { CookiesProvider } from "react-cookie"
export const apolloClient = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache()
});
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

  export const handleBack = () => router.replace("/");
export const isBrowser
    = () => typeof window !== "undefined"

export default function App({ Component, pageProps }) {


    return (
        <CookiesProvider>
            <ApolloProvider client={apolloClient}>
                <Component {...pageProps} />
            </ApolloProvider>
        </CookiesProvider>
    );
}
