import {ListGroup, ListGroupItem} from "reactstrap"
import React from "react";

function BerthaListGroup(props) {
    return(
        <ListGroup>
            <ListGroupItem>Input Text: {props.inputText}</ListGroupItem>
            <ListGroupItem>BERTHA Query: {props.dslText}</ListGroupItem>
            <ListGroupItem>BERTHA Output: {props.evaluatedText}</ListGroupItem>
            <ListGroupItem>BERTHA Errors: {props.errors}</ListGroupItem>
        </ListGroup>
    )
}

export {BerthaListGroup}