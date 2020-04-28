import {datatypes} from '../Common/definitions.js'

const inputLexer = (inputString) => {
    const inputArray = inputString.split(" ")
    return inputArray.map((item, idx) => {
        let lexedItem = lexedInputItem(item, idx)
        Object.keys(datatypes).forEach(dt => {
            lexedItem[dt] = datatypes[dt].operation(item)
        })
        return lexedItem
    })
}

const lexedInputItem = (val, idx) => {
    let lexedItem = {
        value: val,
        index: idx,
    }
    Object.keys(datatypes).forEach(dt => {
        lexedItem[dt] = false
    })
    return lexedItem
}

// console.log(inputLexer(`i am an@beast input 12 2/12/2020`))

export {inputLexer}