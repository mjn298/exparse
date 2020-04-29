import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import {BerthaListGroup} from "./BerthaListGroup";
import React from "react";

function Bertha(props) {
 return (
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
 )
}

export {Bertha}