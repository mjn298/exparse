import {lexer} from "./DSL/ExpressionLexers.js";
import {inputLexer} from "./InputProcessor/InputLexers.js";
import {combine} from "./DSL/parser2.js"

const evaluator = (inputString, dslString) => {
    const lexedDSL = lexer(dslString)
    const {parsedOperator, sanitizedInput} = combine(inputString, lexedDSL)
    const lexedInput = inputLexer(sanitizedInput)
    console.log(parsedOperator)
    return parsedOperator(lexedInput).join(" ")
}

export {evaluator}

