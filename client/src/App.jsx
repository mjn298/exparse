import {hot} from 'react-hot-loader';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Container, Jumbotron, ListGroup, ListGroupItem, ListGroupItemHeading} from 'reactstrap'
import {Bertha} from "./Bertha";

const apiEndpoint = "http://localhost:3000"

const App = () => (
    <div className="App">
        <Bertha/>
        <Container>
            <Jumbotron>
                <h3>Who Is BERTHA?</h3>
                <p>BERTHA is a lexer/parser with an extremely limited vocabulary, capable
                    of comprehending positions, ranges, and basic datatypes.</p>
                <ListGroup>
                    <ListGroupItemHeading>DataTypes: Lexable names</ListGroupItemHeading>
                    <ListGroupItem>IMPORTANT: BERTHA is very strict and an email is not a string is not a date. Keep this in mind. Selecting three strings from an input of 10 emails will return nothing.</ListGroupItem>
                    <ListGroupItem><b>Strings: </b> word(s), string(s), name(s)</ListGroupItem>
                    <ListGroupItem><b>Emails: </b> email(s)</ListGroupItem>
                    <ListGroupItem><b>Dates: </b> date(s)</ListGroupItem>
                    <ListGroupItemHeading>Search Term</ListGroupItemHeading>
                    <ListGroupItem>BERTHA can accommodate one search term passed in quotes. Whitespace and non alphabetical characters are OK.</ListGroupItem>
                    <ListGroupItemHeading>Position or Cardinality</ListGroupItemHeading>
                    <ListGroupItem>Any integer (either as n or nth, either will work)</ListGroupItem>
                    <ListGroupItem>Numerical adjectives from first to tenth (last does not work, I didn't implement that)</ListGroupItem>
                    <ListGroupItemHeading>Relative or Range</ListGroupItemHeading>
                    <ListGroupItem>Range: "through" or "to" inclusive. You must provide two positions and a datatype</ListGroupItem>
                    <ListGroupItem>Anterior: "before" or "preceding". You must provide what data type you want returned, and what it should be positioned relative to. The relative point must be a string in quotes like so "matchingString"</ListGroupItem>
                    <ListGroupItem>Posterior: "after" or "following". Other conditions are the same</ListGroupItem>
                    <ListGroupItemHeading>Examples Of Valid Inputs for you to Experiment With</ListGroupItemHeading>
                    <ListGroupItem>Position and Datatype: text: "our first date was 4/01/2020 and our second date was 4/25/2020" rule: "second date" </ListGroupItem>
                    <ListGroupItem>Relative and Search Token: text:"don't forget to call their Phone Number" rule: string preceding "Phone"</ListGroupItem>
                    <ListGroupItem>Range: text: "i have words 4/28/2020 in here man" rule: "second through 4th words"</ListGroupItem>
                    <p>Please see server/spec/evaluator.ft.spec.js for more examples</p>
                </ListGroup>
            </Jumbotron>

        </Container>

    </div>
)


export default hot(module)(App);
