import {useRouter} from "next/router";
import {apolloClient} from "../_app"
import {gql, useQuery} from "@apollo/client";

const abChoiceElementFromUrl = url => {
    return (
        <div style={{float: "left", padding: "10", width: 200, height: 200}}>
            <img src={url}/>
            <button>Select</button>
        </div>);
}


const allAbs = gql`
    query Query  {
        abs   {cid ,first, second}
    }
`;

const ab = gql`
    query Query( $cid : ID!) {
        ab ( cid : $cid ) { cid, first, second}
    }
`;


const ABTest = (props, state) => {
    if (!state.cid) {

        const router = useRouter();
        const {cid} = router.query;
        state =  {
            cid, ...state
        };
    }
    const {loading, error, data} = useQuery(ab, {variables: {cid : state.cid}});
    if (loading) return <p>Loading</p>;
    if (error) return <p>Error</p>;

    console.log(data.ab)

    const choice1 = abChoiceElementFromUrl(data.ab.first);
    const choice2 = abChoiceElementFromUrl(data.ab.second);
    return (

        <div>
            <p>{state.cid}</p>
            {choice1}
            {choice2}
        </div>


    )
}

export default ABTest;
