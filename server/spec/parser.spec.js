import test from 'ava'
import * as parsers from '../src/DSL/parser.js'
import {lexer} from '../src/DSL/ExpressionLexers.js'
import {tokenizedItem} from "../src/DSL/ExpressionLexers.js";
import {inputLexer} from "../src/InputProcessor/InputLexers.js"

test('search parser', t => {
    const lexed = lexer("a 'Phone Number'")
    const output = parsers.searchParser("this is a Phone Number", lexed)
    const expected = {
        inputArray: ["this", "is", "a", "PhoneNumber"],
        searchTerm: tokenizedItem("searchKey", 1, "Phone Number", "searchKey"),
        searchTermIndex: 3
    }
    t.deepEqual(output, expected)
})

test('position parser', t => {
    const lexed = lexer("first through third")
    const output = parsers.positionParser(lexed)
    const expected = [0, 2]
    t.deepEqual(output, expected)
})

test('noun parser', t => {
    const parsedInput = inputLexer("looking for 15 strings")
    const lexed = lexer("i have a word")
    const output = parsers.nounParser(lexed)(parsedInput)
    t.is(output.length, 3)
})

// test('range parser', t => {
//     const lexed = lexer("after something strings word")
//     const output = parsers.rangeParser(lexed)
//     const expected = parsers.relativeExpression("anterior")
//     t.deepEqual(output, expected)
// })