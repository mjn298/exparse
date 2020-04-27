import {positional, datatypes, relative} from '../Common/definitions.js'
const tokenizedItem = (grammar, position, value, type) => {
    return {
        grammar: grammar,
        position: position,
        value: value,
        type: type,
    }
}

/***
 * This finds a token in the string to match, it only finds one.
 * To find more than one it would have to scan the array for pairs of
 * quote marks, and then return an array of match tokens.
 * @param queryString: String
 * @returns tokenizedItem
 */
const searchTokenLexer = (queryString) => {
    const openIdx = queryString.indexOf("\"")
    if (openIdx === -1) {
        return tokenizedItem(false, false, false, false)
    } else {
        const closeIdx = queryString.lastIndexOf("\"")
        const position = queryString.split(" ").findIndex(word => {
            word.startsWith('"') || word.startsWith("'")
        })
        return tokenizedItem("searchKey", position, queryString.slice(openIdx + 1, closeIdx), "searchKey")
    }
}

const positionalLexer = (queryArray) => {
    return queryArray.map((word, idx) => {
        if (positional.hasOwnProperty(word)) {
            return tokenizedItem("positional", idx, positional[word], "index")
        } else if (parseInt(word[0])) {
            return tokenizedItem("positional", idx, parseInt(word.slice(0, word.length - 2)), "index")
        } else {
            return word
        }
    })
}

const datatypeLexer = (queryArray) => {
    return queryArray.map((word, idx) => {
        let token = word
        Object.keys(datatypes).forEach(dt => {
            if(datatypes[dt].terms.includes(word)) {
                token = tokenizedItem("noun", idx, word, dt)
            }
        })
        return token
    })
}

const relativeLexer = (queryArray) => {
    return queryArray.map((word, idx) => {
        let token = word
        Object.keys(relative).forEach(rt => {
            if(relative[rt].terms.includes(word)) {
                token = tokenizedItem("relative", idx, word, rt)
            }
        })
        return token
    })
}

const lexer = (queryString) => {
    const searchToken = searchTokenLexer(queryString)
    const compose = a => f => g => t => f(g(t(a)))
    const queryArray = queryString.split(" ")
    const lexed = compose(queryArray)(relativeLexer)(datatypeLexer)(positionalLexer)
    const lexedWithSearch = lexed.concat(searchToken).filter(tokenItem => {
        return tokenItem.hasOwnProperty("position") && tokenItem.position !== false
    }).sort((a, b) => a.position - b.position)
    return lexedWithSearch
}

export {lexer}

