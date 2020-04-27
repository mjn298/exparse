import {lexer} from './ExpressionLexers.js'
import {inputLexer} from '../InputProcessor/InputLexers.js'
import {relative} from '../Common/definitions.js'

const expParser = (queryString) => {
    const rels = lexer(queryString)
    return rels
}

const determinePositions = (lexedExpression) => {
    return lexedExpression.filter(item => item.grammar === "positional")
}

const determineNouns = lexedExpression => {
    return lexedExpression.filter(item => item.grammar === "noun")
}

const determineRanges = lexedExpression => {
    const r = lexedExpression.filter(item => item.grammar === "relative")[0]
    const ps = determinePositions(lexedExpression).map(item => item)
    let start, end
    if(ps.length === 2) {
        start = ps[0].value
        end = ps[1].value
    }
    return relative[r.type].operation(start)(end)
}

const determineMatch = lexedExpression => {
    const ss = lexedExpression.filter(item => item.type === "searchKey")
    return ss.length ? ss[0] : null
}

const merged = (lexedQuery, lexedInput) => {
    const ps = determinePositions(lexedQuery)
    const ns = determineNouns(lexedQuery)
    console.log(ps)
    console.log(ns)
    return lexedInput.filter(item => item[ns[0].type])[ps[0].value].value
}

const exp = expParser("first through before fourth words")

const inp = inputLexer("i am an input")
console.log(determineRanges(exp))

// console.log(merged(exp, inp))
