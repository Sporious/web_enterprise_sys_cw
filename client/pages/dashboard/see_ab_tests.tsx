import {Component} from "react";
import {HTML} from "mdast";

type ABElement<T> = {
    id: number,
    name: string,
    option_a: ABOption<T>,
    option_b: ABOption<T>,
    total_votes: number
}

type ABOption<T> = {
    name: string,
    result: T,
    votes: number
}


const demoElement: ABElement<string> = {
    id: 123,
    name: "The Demo element",
    total_votes: 5,
    option_a: {
        name: "Option a name",
        votes: 2,
        result: "Demo result A "
    },
    option_b: {
        name: "Option b name",
        votes: 3,
        result: "Demo result B "
    }
}
const ABRow = (props: { ab_element: ABElement<string> }, state) => {

    return (
        <div>
            <h3>{props.ab_element.name}</h3>
            <h4>Validity : {
                isABElementValid(props.ab_element).toString()
            }</h4>
        </div>
    )


}

export const RenderTestRow = (props, state)  => {
    return (
        <ABRow ab_element={demoElement}/>
    );
}


const isABElementValid = (ab_element: ABElement<any>): boolean => {

    return ab_element.total_votes - ab_element.option_a.votes - ab_element.option_b.votes === 0;
}




