import test from 'ava'
import {inputLexer} from "../src/InputProcessor/InputLexers.js"

test("input lexing", t => {
    const output = inputLexer("4/27/2020 mike@mike.com 15 nothing")
    const expected = [
        {value: "4/27/2020", index: 0, string: false, email: false, date: true, num: false},
        {value: "mike@mike.com", index: 1, string: false, email: true, date: false, num: false},
        {value: "15", index: 2, string: false, email: false, date: false, num: true},
        {value: "nothing", index: 3, string: true, email: false, date: false, num: false}
    ]
    t.deepEqual(output, expected)
})