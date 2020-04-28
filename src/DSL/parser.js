import {lexer} from './ExpressionLexers.js'
import {inputLexer} from '../InputProcessor/InputLexers.js'
import {relative} from '../Common/definitions.js'

const expParser = (queryString, inputString) => {
    const lexed = lexer(queryString)
    console.log(lexed)
    const rangeExp = rangeParser(lexed)
    const [start, endOrRange] = [...positionParser(lexed)]
    const nounExp = nounParser(lexed)
    const {inputArray, searchTerm, searchTermIndex} = searchParser(inputString, lexed)
}

const rangeExpression = (start, end) => a => f => f(a).slice(start, end)
const relativeExpression = type => start => range => {
    if(type === 'range') {
        return rangeExpression(start, range)
    }
   const end = type === "anterior" ? start - range : start + range
   return rangeExpression(Math.min(start, end), Math.max(start, end))
}

const combinator = input => searchParser => positionalParser => rangeParser => nounParser => {
    return nounParser(rangeParser(positionalParser(searchParser(input))))
}

const positionParser = (lexedExpression) => {
    // const searchKey = searchParser(lexedExpression)
    const ps = lexedExpression.filter(item => item.grammar === "positional")
    return ps.map(i => i.value)
}

const nounParser = lexedExpression => {
    const ns = lexedExpression.find(item => item.grammar === "noun")
    try {
        const noun = ns
        return a => a.filter(item => item[noun.type])
    } catch {
        throw new Error("Expression must contain a noun (word, email, date, string)")
    }
}

const rangeParser = lexedExpression => {
    const r = lexedExpression.find(item => item.grammar === "relative")
    if(r) {
        return relativeExpression(r.type)
    } else {
        return a => a
    }
}

const searchParser = (inputString, lexedExpression) => {
    const ss = lexedExpression.find(item => item.type === "searchKey")
    let inputArray;
    if(ss) {
        inputArray = inputString.replace(ss.value, ss.value.replace(" ", "")).split(" ")
     } else {
        inputArray = inputString.split(" ")
    }
    return {
        inputArray: inputArray,
        searchTerm: ss,
        searchTermIndex: ss ? inputArray.indexOf(ss.value.replace(" ", "")) : -1
    }
}

const merged = (lexedQuery, lexedInput) => {
    const ps = determinePositions(lexedQuery)
    const ns = determineNouns(lexedQuery)
    console.log(ps)
    console.log(ns)
    return lexedInput.filter(item => item[ns[0].type])[ps[0].value].value
}

const exp = expParser("first through fourth words", "i am an input")

const inp = inputLexer("i am an input")

// console.log(merged(exp, inp))
export {searchParser, positionParser, nounParser, rangeParser, relativeExpression}