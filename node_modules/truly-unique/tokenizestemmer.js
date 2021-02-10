const stemmer = require('stemmer')
const accents = require('remove-accents')
const {stopwords} = require('./stopwordsEn.json')

const filterstopw = (arr, opts = {}) =>
  opts.stopwords ? arr.filter(t => !stopwords.includes(t)) : arr

const tokenize = (str, opts) => filterstopw(str
  .replace(/\n|\t/g, ' ')
  .split(' ')
  .filter(t => t.match(/[0-9a-z_]/i))
  .map(t => accents.remove(t.toLowerCase()))
  .map(t => t.replace(/[^0-9a-z_]/ig, '')), opts)

const tokenizeStem = (str, opts) => tokenize(str, opts).map(t => stemmer(t))

module.exports = {
  tokenize,
  tokenizeStem
}
