import {hot} from 'react-hot-loader';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Bertha} from "./Bertha";

const apiEndpoint = "http://localhost:3000"

const App = () => (
    <div className="App">
        <Bertha/>
    </div>
)


export default hot(module)(App);
