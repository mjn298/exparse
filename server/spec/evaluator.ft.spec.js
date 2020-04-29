import test from 'ava'
import {evaluator} from "../src/evaluator.js";

test("second word", t => {
    const input = "testing my parse ok"
    const dsl = "second word"
    const output = evaluator(input, dsl)
    const expected = "my"
    t.is(output, expected)
})

test("second date", t => {
    const input = "our first date was 4/01/2020 and our second date was 4/25/2020"
    const dsl = "second date"
    const output = evaluator(input, dsl)
    const expected = "4/25/2020"
    t.is(output, expected)
})

test("second through 4th word", t => {
    const input = "i have words 4/28/2020 in here man"
    const dsl = "second through 4th word"
    const output = evaluator(input, dsl)
    const expected = "have words in"
    t.is(output, expected)
})

test("email following 3 words", t => {
    const input = "so 4/28/2020 bad@bad.com my address mike@mike.com is as follows"
    const dsl = "email following 3 words"
    const output = evaluator(input, dsl)
    const expected = "mike@mike.com"
    t.is(output, expected)
})

test("string preceding 'Phone'", t => {
    const input = "don't forget to call their Phone Number"
    const dsl = "string preceding \"Phone\""
    const output = evaluator(input, dsl)
    const expected = "their"
    t.is(output, expected)
})

test("3 strings preceding 'Phone'", t => {
    const input = "don't forget to call their Phone Number man"
    const dsl = "3 strings before \"Phone\""
    const output = evaluator(input, dsl)
    const expected = "to call their"
    t.is(output, expected)
})

test("date preceding 'Phone'", t => {
    const input = "be sure that after you listen to 5/9/1977 you call my Phone right away"
    const dsl = "date preceding 'phone'"
    const output = evaluator(input, dsl)
    const expected = "5/9/1977"
    t.is(output, expected)
})

test("2 dates after 'Phone'", t => {
    const input = "make sure to call my Phone on 4/25/2020 and 4/30/2020 to update me"
    const dsl = "2 dates after 'Phone'"
    const output = evaluator(input, dsl)
    const expected = "4/25/2020 4/30/2020"
    t.is(output, expected)
})

test("string before second dollars", t => {
    const input = "send me $10 always $12"
    const dsl = "string before second dollars"
    const output = evaluator(input, dsl)
    const expected = "always"
    t.is(output, expected)
})

test("string after third dollars", t => {
    const input = "It can either be $15 or $25 or $40 depending on what you need"
    const dsl = "string after third dollars"
    const output = evaluator(input, dsl)
    const expected = "depending"
    t.is(output, expected)
})