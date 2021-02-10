const {tokenize, tokenizeStem} = require('./tokenizestemmer.js')

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

const hundredYears = [
  'Muchos años después, frente al pelotón de fusilamiento,',
  'el coronel Aureliano Buendía había de recordar aquella tarde remota',
  'en que su padre lo llevó a conocer el hielo. Macondo era entonces una',
  'aldea de veinte casas de barro y cañabrava construida a la orilla de un río',
  'de aguas diáfanas que se precipitaban por un lecho de piedras pulidas,',
  'blancas y enormes como huevos prehistóricos. El mundo era tan reciente',
  'que muchas cosas carecían de nombre, y para mencionarlas había que señalarlas con el dedo.'
]

test('Testing basic tokenization of the text', () => {
  const tokenized = tokenize(mollyMalone.join(' '))
  expect(tokenized.includes('alive')).toBe(true)
  expect(tokenized.includes('"Cockles')).toBe(false)
  expect(tokenized.includes('cockles')).toBe(true)
  expect(tokenized.includes('and')).toBe(true)
})

test('Testing tokenization of the text with stopwords', () => {
  const tokenized = tokenize(mollyMalone.join(' '), {stopwords: true})
  expect(tokenized.includes('alive')).toBe(true)
  expect(tokenized.includes('"Cockles')).toBe(false)
  expect(tokenized.includes('cockles')).toBe(true)
  expect(tokenized.includes('and')).toBe(false)
})

test('Testing tokenization of the text removing accents', () => {
  const tokenized = tokenize(hundredYears.join(' '))
  expect(tokenized.includes('peloton')).toBe(true)
  expect(tokenized.includes('buendia')).toBe(true)
  expect(tokenized.includes('canabrava')).toBe(true)
  expect(tokenized.includes('llevo')).toBe(true)
})

test('Testing basic tokenization with stemming', () => {
  const tokenizedStemmed = tokenizeStem(mollyMalone.join(' '))
  expect(tokenizedStemmed.includes('aliv')).toBe(true)
  expect(tokenizedStemmed.includes('pretti')).toBe(true)
  expect(tokenizedStemmed.includes('molli')).toBe(true)
  expect(tokenizedStemmed.includes('and')).toBe(true)
})

test('Testing basic tokenization with stemming and stopwords', () => {
  const tokenizedStemmed = tokenizeStem(mollyMalone.join(' '), {stopwords: true})
  expect(tokenizedStemmed.includes('aliv')).toBe(true)
  expect(tokenizedStemmed.includes('pretti')).toBe(true)
  expect(tokenizedStemmed.includes('molli')).toBe(true)
  expect(tokenizedStemmed.includes('and')).toBe(false)
})
