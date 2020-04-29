import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import {BerthaListGroup} from "./BerthaListGroup";
import React from "react";

const apiEndpoint = "http://localhost:5050"

class Bertha extends React.Component {
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

    handleSubmit = event => {
        event.preventDefault()
        const inputVal = this.inputText.current.value.trim()
        const dslVal = this.dslText.current.value.trim()
        this.setState({
            inputText: inputVal,
            dslText: dslVal
        })
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.state.inputText !== prevState.inputText || this.state.dslText != prevState.dslText) {
            try {
                const requestOptions = {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({text: this.state.inputText, rule: this.state.dslText})
                }
                const res = await fetch(`${apiEndpoint}/parse`, requestOptions)
                if (res.status === 500) {
                    this.setState({
                        hasErrors: true,
                        error: `${e.toString()}: Best bet is to refresh`
                    })
                } else {
                    const jsonRes = await res.json()
                    this.setState({
                        hasErrors: false,
                        error: "",
                        evaluatedText: jsonRes.evaluated
                    })
                }
            } catch (e) {
                this.setState({
                    hasErrors: true,
                    error: `${e.toString()} - check the console or refresh`
                })
            }
        }
    }


    render() {
        return (
            <Container>
                <h1>BERTHA</h1>
                <h3>Bounded Electronic Readable Text Homework Assessment</h3>
                <fieldset>
                    <legend>Enter the text to query, and the rule</legend>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="rawText">Raw Text</Label>
                            <Input type="text" name="rawText" id="rawText" placeholder="enter raw text"
                                   innerRef={this.inputText}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="query">Query</Label>
                            <Input type="text" name="query" id="query" placeholder="enter BERTHA query"
                                   innerRef={this.dslText}/>
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
        )
    }

}

export {Bertha}