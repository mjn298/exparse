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

const rangeMethod = direction => (position, range) => input => {
    if (direction === "backward") {
        return input.slice(position - range, position)
    } else {
        return input.slice(position, position + range)
    }
}

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
        operation: s => typeof s === 'string' && !datatypes.date.operation(s) && !datatypes.num.operation(s) && !isEmail(s)
    },
    email: {
        terms: ["email"],
        operation: e => isEmail(e)
    },
    date: {
        terms: ["date"],
        operation: d => isNaN(d) && !!Date.parse(d) //Date.parse returns NaN if input can't be parsed, so using double NOT to get a boolean
    },
    num: {
        terms: [],
        operation: n => !isNaN(n)
    },
}

const isEmail = (word) => {
    return word.includes("@") && word.split("@").length === 2
}

export {positional, numericalSuffixes, ranges, rangeMethod, relative, logicalOps, datatypes}

