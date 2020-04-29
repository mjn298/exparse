import {ListGroup, ListGroupItem} from "reactstrap"
import React from "react";




function BerthaListGroup(props) {
    const items = props.props //Todo WTF??
    return(
        <ListGroup>
            <ListGroupItem>Input Text: {items.inputText}</ListGroupItem>
            <ListGroupItem>BERTHA Query: {items.dslText}</ListGroupItem>
            <ListGroupItem>BERTHA Output: {items.evaluatedText}</ListGroupItem>
            <ListGroupItem>BERTHA Errors: {items.errors}</ListGroupItem>
        </ListGroup>
    )
}

export {BerthaListGroup}