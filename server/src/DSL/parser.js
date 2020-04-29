import * as grammar from "./grammar.js";
import {tokenizedItem} from "./ExpressionLexers.js";

const searchEvaluator = (inputString, lexedExpression) => {
    const ss = lexedExpression.find(item => item.type === "searchKey")
    let sanitizedString;
    let searchPosition
    if(ss) {
        sanitizedString = inputString.replace(ss.value, ss.value.replace(" ", ""))
        searchPosition = ss.position
    } else {
        sanitizedString = inputString
        searchPosition = 0
    }
    const inputArray = sanitizedString.split(" ")
    return {
        inputString: sanitizedString,
        searchTerm: ss,
        searchTermIndex: searchPosition ? inputArray.indexOf(ss.value.replace(" ", "")) : -1
    }
}

const parser = (searchOutput, lexedExpression) => {
    const nouns = lexedExpression.filter(item => item.grammar === "noun")
    const relatives = lexedExpression.filter(item => item.grammar === "relative")
    const positionals = lexedExpression.filter(item => item.grammar === "positional")
    if (searchOutput.searchTerm) {
        const noun = lexedExpression.find(item => item.grammar === "noun")
        const relativeToken = lexedExpression.find(item => item.grammar === "relative")
        const positional = lexedExpression.find(item => item.grammar === "positional")
        return grammar.nounRelativeToSearchKey(noun, searchOutput.searchTermIndex, relativeToken, positional)
    } else if (nouns.length === 1 && positionals.length === 1) {
        return grammar.positionWithNoun(nouns[0], positionals[0])
    } else if (nouns.length === 1 && positionals.length === 2 && relatives.length === 1) {
        positionals.sort((a, b) => a.value - b.value)
        return grammar.rangeWithNoun(nouns[0], positionals[0], positionals[1])
    } else if (nouns.length === 2 && relatives.length === 1) {
        const defaultToken = tokenizedItem("positional", 1000, 0, "index")
        const posToken = positionals.length > 0 ? positionals[0] : defaultToken
        const targetNoun = nouns.find(n => n.position < relatives[0].position)
        const relativeNoun = nouns.find(n => n.position > relatives[0].position)
        return grammar.positionRelativeToNoun(targetNoun, relativeNoun, relatives[0], posToken)
    } else {
        return new Error("DSL Parsing Error")
    }
}

const combine = (inputString, lexedExpression) => {
        const searchOutput = searchEvaluator(inputString, lexedExpression)
        return {
            parsedOperator: parser(searchOutput, lexedExpression),
            sanitizedInput: searchOutput.inputString
        }
}

export {combine}
