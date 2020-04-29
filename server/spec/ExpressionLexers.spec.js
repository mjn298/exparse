import test from 'ava'
import * as lexers from "../src/DSL/ExpressionLexers.js";

const toArr = s => s.split(" ")

test('Search Lexer with no search tokens', t => {
    const noOutput = lexers.searchTokenLexer("no valid search token")
    const expected = lexers.tokenizedItem(false, false, false, false)
    t.deepEqual(noOutput, expected)
})

test('Search Lexer with search token', t => {
    const output = lexers.searchTokenLexer("I contain 'valid search output'")
    const expected = lexers.tokenizedItem("searchKey", 2, "valid search output", "searchKey")
    t.deepEqual(output, expected)
})

test('Positional Lexer', t => {
    const output = lexers.positionalLexer(toArr("first through 4th"))
    const expected = [
        lexers.tokenizedItem("positional", 0, 0, "index"),
        "through",
        lexers.tokenizedItem("positional", 2, 3, "index")
    ]
    t.deepEqual(output, expected)
})

test('datatypeLexer', t => {
    const output = lexers.datatypeLexer(toArr("email word date"))
    const expected = [
        lexers.tokenizedItem("noun", 0, "email", "email"),
        lexers.tokenizedItem("noun", 1, "word", "string"),
        lexers.tokenizedItem("noun", 2, "date", "date")
    ]
    t.deepEqual(output, expected)
})

test('relativeLexer', t => {
   const output = lexers.relativeLexer(toArr("through before following"))
    const expected = [
        lexers.tokenizedItem("relative", 0, "through", "range"),
        lexers.tokenizedItem("relative", 1, "before", "anterior"),
        lexers.tokenizedItem("relative", 2, "following", "posterior")
    ]
    t.deepEqual(output, expected)
})

test('lexer', t => {
    const output = lexers.lexer("second word after \"Mike\"")
    const expected = [
        lexers.tokenizedItem("positional", 0, 1, "index"),
        lexers.tokenizedItem("noun", 1, "word", "string"),
        lexers.tokenizedItem("relative", 2, "after", "posterior"),
        lexers.tokenizedItem("searchKey", 3, "Mike", "searchKey")
    ]
    t.deepEqual(output, expected)
})