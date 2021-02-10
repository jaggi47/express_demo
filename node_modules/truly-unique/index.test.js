const {
  uniqueWords,
  repeatedWords,
  mostCommonWordsCount,
  uniquePhrases,
  repeatedPhrases,
  phrasesWithUniqueWords,
  phrasesWithRepeatedWords
} = require('./index.js')

const mollyMalone = [
  'In Dublin"s fair city,',
  'Where the girls are so pretty,',
  'I first set my eyes on sweet Molly Malone,',
  'As she wheeled her wheel-barrow,',
  'Through streets broad and narrow,',
  'Crying, "Cockles and mussels, alive, alive, oh!"',
  '"Alive, alive, oh,',
  'Alive, alive, oh,"',
  'Crying "Cockles and mussels, alive, alive, oh".',
  'She was a fishmonger',
  'But sure "twas no wonder',
  'For so were her father and mother before',
  'And they each wheel"d their barrow',
  'Through streets broad and narrow',
  'Crying "Cockles and mussels alive, alive oh!"',
  'She died of a fever,',
  'And no one could save her,',
  'And that was the end of sweet Molly Malone.',
  'But her ghost wheels her barrow,',
  'Through streets broad and narrow,',
  'Crying, "Cockles and mussels, alive, alive, oh!"'
]

test('Testing getting unique words of the text', () => {
  const unique = uniqueWords(mollyMalone.join(' '))
  expect(unique.includes('ghost')).toBe(true)
  expect(unique.includes('fishmonger')).toBe(true)
  expect(unique.includes('mussels')).toBe(false)
  expect(unique.includes('for')).toBe(true)
})

test('Testing getting unique words of the text with stopwords', () => {
  const unique = uniqueWords(mollyMalone.join(' '), {stopwords: true})
  expect(unique.includes('ghost')).toBe(true)
  expect(unique.includes('fishmonger')).toBe(true)
  expect(unique.includes('mussels')).toBe(false)
  expect(unique.includes('for')).toBe(false)
})

test('Testing getting repeated words in the text', () => {
  const repeated = repeatedWords(mollyMalone.join(' '))
  expect(repeated.includes('mussels')).toBe(true)
  expect(repeated.includes('of')).toBe(true)
  expect(repeated.includes('ghost')).toBe(false)
})

test('Testing getting repeated words in the text with stopwords', () => {
  const repeated = repeatedWords(mollyMalone.join(' '), {stopwords: true})
  expect(repeated.includes('mussels')).toBe(true)
  expect(repeated.includes('of')).toBe(false)
  expect(repeated.includes('ghost')).toBe(false)
})

test('Testing getting most common words in the text', () => {
  const mostcommon = mostCommonWordsCount(mollyMalone.join(' '))
  expect(mostcommon[0].key).toBe('alive')
  expect(mostcommon[1].key).toBe('and')
})

test('Testing getting most common words in the text with stopwords', () => {
  const mostcommon = mostCommonWordsCount(mollyMalone.join(' '), {stopwords: true})
  expect(mostcommon[0].key).toBe('alive')
  expect(mostcommon[1].key).toBe('oh')
})

test('Testing getting unique phrases in the text', () => {
  const phrasesunique = uniquePhrases(mollyMalone)
  expect(phrasesunique.includes('I first set my eyes on sweet Molly Malone,')).toBe(true)
  expect(phrasesunique.includes('And no one could save her,')).toBe(true)
  expect(phrasesunique.length).toBe(12)
})

test('Testing getting repeated phrases in the text', () => {
  const repeatedphrases = repeatedPhrases(mollyMalone)
  expect(repeatedphrases.includes('Alive, alive, oh,"')).toBe(true)
  expect(repeatedphrases.includes('Through streets broad and narrow,')).toBe(true)
  expect(repeatedphrases.length).toBe(9)
})

test('Testing getting getting phrases with unique words', () => {
  const phrasesunique = phrasesWithUniqueWords(mollyMalone)
  expect(phrasesunique.includes('In Dublin"s fair city,')).toBe(true)
  expect(phrasesunique.length).toBe(1)
})

test('Testing getting getting phrases with unique words if it is a String', () => {
  const phrasesunique = phrasesWithUniqueWords(mollyMalone.join('\n'))
  expect(phrasesunique.includes('In Dublin"s fair city,')).toBe(true)
  expect(phrasesunique.length).toBe(1)
})

test('Testing getting getting phrases with unique words, using stopwords', () => {
  const phrasesunique = phrasesWithUniqueWords(mollyMalone, {stopwords: true})
  expect(phrasesunique.includes('In Dublin"s fair city,')).toBe(true)
  expect(phrasesunique.includes('Where the girls are so pretty,')).toBe(true)
  expect(phrasesunique.length).toBe(8)
})

test('Testing getting getting phrases with unique words', () => {
  const phrasesrepeated = phrasesWithRepeatedWords(mollyMalone)
  expect(phrasesrepeated.includes('Alive, alive, oh,"')).toBe(true)
  expect(phrasesrepeated.includes('She was a fishmonger')).toBe(true)
  expect(phrasesrepeated.length).toBe(20)
})

test('Testing getting getting phrases with unique words, using stopwords', () => {
  const phrasesrepeated = phrasesWithRepeatedWords(mollyMalone, {stopwords: true})
  expect(phrasesrepeated.includes('Alive, alive, oh,"')).toBe(true)
  expect(phrasesrepeated.includes('She was a fishmonger')).toBe(false)
  expect(phrasesrepeated.length).toBe(13)
})
