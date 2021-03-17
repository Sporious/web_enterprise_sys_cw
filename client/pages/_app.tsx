import '../styles/global.css'
import {ApolloProvider} from '@apollo/client';

export const apolloClient = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache()
});
import {ApolloClient, gql, InMemoryCache} from '@apollo/client';


export default function App({Component, pageProps}) {
    return (
        <ApolloProvider client={apolloClient}>
            <Component {...pageProps} />
        </ApolloProvider>
    );
}
