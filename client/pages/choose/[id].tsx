import {useRouter} from "next/router";
import {apolloClient} from "../_app"
import {gql, useQuery} from "@apollo/client";

const abChoice = ( which, id) => { 
    if (which == "first") {

    } else {

    }
};
const ABChoiceElementFromUrl =  (props, state) => {
    return (
        <div style={{float: "left", padding: "10", width: 200, height: 200}}>
            <img src={props.url}/>
            <button>Select</button>
        </div>);
}


const allAbs = gql`
    query Query  {
        getAllAbTests  {first, second}
    }
`;

const ab = gql`
    query Query( $id : Int!) {
        getAbTest(id: $id) { id, first, second}
    }
`;

const getabtestresult = gql`
    query Query ( $id : Int!) {
        getAbTestResult( id : $id ) { uuid, abtest, resultfirst, resultsecond }
    }

`;


const ABTest = (props, state) => {
    if (!state.id) {

        const router = useRouter();
        const {id} = router.query;
        state =  {
            id, ...state
        };
    }
    const {loading, error, data} = useQuery(ab, {variables: {id : parseInt( state.id ) }});
    if (loading) return <p>Loading</p>;
    if (error) return <p>Error</p>;

    console.log(data.id)
    return (

        <div>
            <p>{state.id}</p>
            <ABChoiceElementFromUrl url={data.getAbTest.first} />
            <ABChoiceElementFromUrl url={data.getAbTest.second} />
        </div>


    )
}

export default ABTest;
