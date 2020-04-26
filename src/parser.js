import {lexer} from './lexers.js'

const expParser = (queryString) => {
    const rels = lexer(queryString)
    console.log(rels)
}

expParser("second through 4th words \"dude man\"")
