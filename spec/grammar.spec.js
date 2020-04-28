import test from 'ava'
import * as grammar from '../src/DSL/grammar.js'
import {inputLexer} from "../src/InputProcessor/InputLexers.js";
import {tokenizedItem} from "../src/DSL/ExpressionLexers.js";

test('position with noun', t => {
    const lexed = inputLexer("i am a word")
    const output = grammar.positionWithNoun(
        tokenizedItem("noun", 1, "word", "string"),
        tokenizedItem("positional", 0, 1, "index")
    )(lexed)
    const expected = ["am"]
    t.deepEqual(output, expected)
})

test('range with noun', t => {
    const lexed = inputLexer("fed into range method")
    const output = grammar.rangeWithNoun(
        tokenizedItem("noun", 1, "words", "string"),
        tokenizedItem("positional", 2, 1, "index"),
        tokenizedItem("positional", 0, 3, "index")
    )(lexed)
    const expected = ["into", "range", "method"]
    t.deepEqual(output, expected)
})

test('position relative to noun', t => {
    const lexed = inputLexer("is a person mike@mike.com")
    const output = grammar.positionRelativeToNoun(
        tokenizedItem("noun", 0, "email", "email"),
        tokenizedItem("noun", 3, "words", "string"),
        tokenizedItem("relative", 1, "following", "posterior"),
        tokenizedItem("positional", 2, 2, "index"),
    )(lexed)
    const expected = ["mike@mike.com"]
    t.deepEqual(output, expected)
})

test('noun relative to search key', t => {
    const lexed = inputLexer("I 4/28/2020 the key")
    const output = grammar.nounRelativeToSearchKey(
        tokenizedItem("noun", 0, "date", "date"),
        2,
        tokenizedItem("relative", 2, "before", "anterior")
    )(lexed)
    const expected = ["4/28/2020"]
    t.deepEqual(expected, output)
})

test('multiple nouns relative to search key', t => {
    const lexed = inputLexer("whatever whatever ignore Phone good results here")
    const output = grammar.nounRelativeToSearchKey(
        tokenizedItem("noun", 0, "strings", "string"),
        3,
        tokenizedItem("relative", 2, "after", "posterior"),
        tokenizedItem("relative", 3, 3, "index")
    )(lexed)
    const expected = ["good", "results", "here"]
    t.deepEqual(output, expected)
})