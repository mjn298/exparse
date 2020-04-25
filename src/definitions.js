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

const rangeMethod = (direction) => (position, range) => input => f => f(direction, position, range, input)

const relative = {
    anterior: {
        terms: ["before", "preceding"],
        operation: rangeMethod("backward")
    },
    posterior: {
        terms: ["after", "following"],
        operation: rangeMethod("forward")
    },
    range: {
        terms: ["through", "to"],
        operation: rangeMethod("forward")
    }
}

const logicalOps = {
    and: a => b => a && b,
    or: a => b => a || b,
}

const datatypes = {
    string: {
        terms: ["string", "name", "word", "strings", "names", "words"],
        operation: s => typeof s === 'string'
    },
    email: {
        terms: ["email"],
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

module.exports = {
    positional: positional,
    numericalSuffixes: numericalSuffixes,
    ranges: ranges,
    rangeMethod: rangeMethod,
    relative: relative,
    logicalOps: logicalOps,
    datatypes: datatypes,
    isEmail: isEmail,
}