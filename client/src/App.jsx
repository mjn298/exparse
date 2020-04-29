import {hot} from 'react-hot-loader';
import React from 'react';
import {Button, Container, Form, FormGroup, Input, Label, ListGroup, ListGroupItem} from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BerthaListGroup} from "./BerthaListGroup";

const apiEndpoint = "http://localhost:3000"

class App extends React.Component {
    constructor(props) {
        super(props);
        this.inputText = React.createRef()
        this.dslText = React.createRef()
        this.state = {
            inputText: "",
            dslText: "",
            evaluatedText: "",
            hasErrors: false,
            error: ""
        }

    }

    // makeRequest = async (inputVal, dslVal) => {
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json'},
    //         body: JSON.stringify({text: inputVal, rule: dslVal})
    //     }
    //     try {
    //         const result = await fetch(`${apiEndpoint}/parse`, requestOptions)
    //         const resBody = result.json()
    //         if(result.status === 500) {
    //             this.setState({
    //                 hasErrors: true,
    //                 error: resBody.err
    //             })
    //         } else {
    //             this.setState({
    //                 inputText: resBody.inputText,
    //                 dslText: resBody.evaluated,
    //                 evaluatedText: resBody.evaluated,
    //                 hasErrors: false,
    //                 error: ""
    //             })
    //         }
    //     } catch(e) {
    //         this.setState({
    //             hasErrors: true,
    //             error: `${e.toString()}: N.B probably CORS related - check the console`
    //         })
    //     }
    // }

    handleSubmit = event => {
        const inputVal = this.inputText.current.value.trim()
        const dslVal = this.dslText.current.value.trim()
        this.setState({
            inputText: inputVal,
            dslText: dslVal
        })
        // await this.makeRequest(inputVal, dslVal)
    }

    render() {
        return (
            <div className="App">
                <Container>
                    <h1>BERTHA</h1>
                    <h3>Bounded Electronic Readable Text Homework Assessment</h3>
                    <fieldset>
                        <legend>Enter the text to query, and the rule</legend>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="rawText">Raw Text</Label>
                                <Input type="text" name="rawText" id="rawText" placeholder="enter raw text" innerRef={this.inputText}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="query">Query</Label>
                                <Input type="text" name="query" id="query" placeholder="enter BERTHA query" innerRef={this.dslText}/>
                            </FormGroup>
                            <Button type="submit">Submit</Button>
                        </Form>
                    </fieldset>
                    <div>
                        <fieldset>
                            <legend>enjoy the results</legend>
                            <BerthaListGroup props={this.state}/>
                        </fieldset>
                    </div>
                </Container>
            </div>
        )
    }
}


export default hot(module)(App);
