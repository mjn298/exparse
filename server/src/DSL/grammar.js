import {relative} from "../Common/definitions.js";

const filterByType = (token, a) => {
    return a.filter(item => item[token.type])
}

const positionWithNoun = (noun, positional) => lexedInput => {
    const filteredInput = filterByType(noun, lexedInput)
    return [filteredInput[positional.value].value]
}

const rangeWithNoun = (noun, startPos, endPos) => lexedInput => {
    const filteredInput = filterByType(noun, lexedInput)
    return filteredInput.slice(startPos.value, endPos.value + 2).map(i => i.value)
}

const positionRelativeToNoun = (targetNoun, relativeNoun, relativeToken, positionalToken) => lexedInput => {
    const relatives = filterByType(relativeNoun, lexedInput)
    const positionOfRelative = relatives[positionalToken.value].index
    const comparator = relativeToken.type === 'anterior' ? (a, b) => a < b : (a, b) => a > b
    const target = lexedInput.find(item => {
        return item[targetNoun.type] && comparator(item.index, positionOfRelative)
    })
    return [target.value]
}
const nounRelativeToSearchKey = (targetNoun, searchIndex, relativeToken, positional) => lexedInput => {
    const range = positional ? positional.value + 1 : 1
    const filteredInput = filterByType(targetNoun, lexedInput)
    const comparator = relativeToken.type === 'anterior' ? i => i < searchIndex : i => i > searchIndex
    const filteredByIndex = filteredInput.filter(item => {
        return comparator(item.index)
    }).map(i => i.value)
    if(relativeToken.type === 'anterior') {
        return filteredByIndex.slice(range * -1)
    } else {
        return filteredByIndex.slice(0, range)
    }
}

export {positionWithNoun, rangeWithNoun, positionRelativeToNoun, nounRelativeToSearchKey}