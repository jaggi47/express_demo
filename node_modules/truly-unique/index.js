const soa = require('sort-objects-array')
const {
  getTokensMap,
  checkPhraseUniqueWords,
  checkPhraseRepeatedWords,
  checkPhraseUnique,
  checkPhraseRepeated,
  checkArray
} = require('./utils.js')

const uniqueWords = (str, opts = {}) => Array.from(
  getTokensMap(str, opts))
  .filter(arr => arr[1] === 1)
  .map(x => x[0])

const repeatedWords = (str, opts = {}) => Array.from(
  getTokensMap(str, opts))
  .filter(arr => arr[1] > (opts.min || 1))
  .map(x => x[0])

const mostCommonWordsCount = (str, opts = {}) => soa(
  Array.from(
    getTokensMap(str, opts)
  )
  .filter(arr => arr[1] > (opts.min || 1))
  .reduce((k, v) => { k[v[0]] = v[1]; return k }, {}), 'value', {order: 'desc'})

const uniquePhrases = (arr, opts = {}) => {
  const tokensMap = getTokensMap(checkArray(arr).map(
    x => x.replace(/ /g, '_')).join(' '), opts)
  const filtered = checkArray(arr).filter(p => checkPhraseUnique(p, tokensMap, opts))
  return filtered
}

const repeatedPhrases = (arr, opts = {}) => {
  const tokensMap = getTokensMap(checkArray(arr).map(
    x => x.replace(/ /g, '_')).join(' '), opts)
  const filtered = checkArray(arr).filter(p => checkPhraseRepeated(p, tokensMap, opts))
  return filtered
}

const phrasesWithUniqueWords = (arr, opts = {}) => {
  const tokensMap = getTokensMap(checkArray(arr).join(' '), opts)
  const filtered = checkArray(arr).filter(p => checkPhraseUniqueWords(p, tokensMap, opts))
  return filtered
}

const phrasesWithRepeatedWords = (arr, opts = {}) => {
  const tokensMap = getTokensMap(checkArray(arr).join(' '), opts)
  const filtered = checkArray(arr).filter(p => checkPhraseRepeatedWords(p, tokensMap, opts))
  return filtered
}

module.exports = {
  uniqueWords,
  repeatedWords,
  mostCommonWordsCount,
  uniquePhrases,
  repeatedPhrases,
  phrasesWithUniqueWords,
  phrasesWithRepeatedWords
}
