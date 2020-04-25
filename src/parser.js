const positional = {
    "first": 0,
    "second": 1,
    "third": 2,
    "fourth": 3,
    "fifth": 4,
    "sixth": 5,
    "seventh": 6,
    "eigth": 7,
    "ninth": 8,
    "tenth": 9,
}

const numericalSuffixes = ["st", "nd", "rd", "th"]

const ranges = ["through", "to"]

const rangeMethod = (position, range, input) => f => f(position, range, input)

const relative = {
    anterior: {
        terms: ["before", "preceding"],
        operation: rangeMethod
    },
    posterior: {
        terms: ["after", "following"],
        operation: rangeMethod
    },
}

const logicalOps = {
    and: a => b => a && b,
    or: a => b => a || b,
}

const datatypes = {
    string: {
        terms: ["string", "name", "word"],
        operation: s => typeof s === 'string'
    },
    email: {
        terms:["email"],
        operation: e => isEmail(e)
    },
    date: {
        terms: ["date"],
        operation: d => !!Date.parse(d) //Date.parse returns NaN if input can't be parsed, so using double NOT to get a boolean
    },
}

const isEmail = (word) => {
    return word.contains("@") && word.split("@").length === 2
}

/***
 * This finds a token in the string to match, it only finds one.
 * To find more than one it would have to scan the array for pairs of
 * quote marks, and then return an array of match tokens.
 * @param queryString: String
 * @returns String
 */
const searchToken = (queryString) => {
    const openIdx = queryString.indexOf("\"")
    if (openIdx === -1) {
        return "NO_QUOTED_TOKEN"
    } else {
        const closeIdx = queryString.lastIndexOf("\"")
        return queryString.slice(openIdx + 1, closeIdx)
    }
}

const expParser = (queryString) => {
    const queryArray = queryString.split(" ")
    const cleanPositionals = queryArray.map(word => {
        if (positional.hasOwnProperty(word)) {
            return positional[word]
        } else if (parseInt(word[0])) {
            return word.slice(0, word.length - 2)
        } else {
            return word
        }
    })
    console.log(cleanPositionals)
}

expParser("second word")
