import {useRouter} from "next/router";
import {apolloClient} from "../_app"
import {gql, useQuery} from "@apollo/client";

const abChoice = (which, id) => {
    if (which == "first") {

    } else {

    }
};
const ABChoiceElementFromUrl = (props, state) => {
    return (
        <div className={"content-center"}>
            <img className={"object-cover h-48"} src={props.url}  />
            <button className={"py-5  rounded text-white font-bold bg-blue-500 hover:bg-blue-700 container content-end"}>Select</button>
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
        state = {
            id, ...state
        };
    }
    const {loading, error, data} = useQuery(ab, {variables: {id: parseInt(state.id)}});
    if (loading) return <p>Loading</p>;
    if (error) return <p>Error</p>;

    console.log(data.id)
    return (

        <div className="grid-cols-3 flex block px-auto  items-center  ">
            <div className={"mx-5 my-5  max-w-lg rounded overflow-hidden shadow-lg container border w-100 "}>
                <div className={"flex container items-center space-x-3 content-center"}>
                    <ABChoiceElementFromUrl url={data.getAbTest.first}/>
                    <ABChoiceElementFromUrl url={data.getAbTest.second}/>
                </div>
            </div>
        </div>


    )
}

export default ABTest;
