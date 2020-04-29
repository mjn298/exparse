import {lexer} from "./DSL/ExpressionLexers.js";
import {inputLexer} from "./InputProcessor/InputLexers.js";
import {combine} from "./DSL/parser.js"

const evaluator = (inputString, dslString) => {
    const lowerInput = inputString.toLowerCase()
    const lowerDSL = dslString.toLowerCase()
    const lexedDSL = lexer(lowerDSL)
    const {parsedOperator, sanitizedInput} = combine(lowerInput, lexedDSL)
    const lexedInput = inputLexer(sanitizedInput)
    return parsedOperator(lexedInput).join(" ")
}

export {evaluator}

