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
    console.log(positional)
    const range = positional ? positional.value + 1 : 1
    const filteredInput = filterByType(targetNoun, lexedInput)
    const start = relativeToken.type === 'anterior' ? searchIndex - range : searchIndex + 1
    const end = relativeToken.type === 'anterior' ? searchIndex : searchIndex + range
    const comparator = relativeToken.type === 'anterior' ? i => i < searchIndex : i => i > searchIndex
    // const firstPass = filteredInput.filter(item => {
    //     console.log(item)
    //     console.log(start, end)
    //     return start <= item.index && item.index <= end && item.index !== searchIndex
    // }).map(i => i.value)
    const secondPass = filteredInput.filter(item => {
        return comparator(item.index)
    }).map(i => i.value)
    if(relativeToken.type === 'anterior') {
        return secondPass.slice(range * -1)
    } else {
        return secondPass.slice(0, range)
    }
    // console.log(firstPass)
    // if(firstPass.length === 0 && range === 1) {
    //     return [filteredInput.find(item => comparator(item.index)).value]
    // } else {
    //     return firstPass
    // }
}

export {positionWithNoun, rangeWithNoun, positionRelativeToNoun, nounRelativeToSearchKey}