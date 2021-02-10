# truly unique

This module analyze the text provided and identify unique or repeated words, the most common words in the text, the phrases with unique words across the text or the phrases with repeated words.

The module supports 'stopwords' with the `{stopwords: true}` argument so the most common words in English are ignored in the process. Look at the following example:

```js
> const {mostCommonWordsCount} = require('truly-unique')
> const sample = 'In computing, stop words are words which are filtered out before or after processing of natural language data'
> mostCommonWordsCount(sample)
[ { key: 'are', value: 2 }, { key: 'words', value: 2 } ]
> mostCommonWordsCount(sample, {stopwords: true})
[ { key: 'words', value: 2 } ]
```

The module supports for now English only, but it will attempt to remove the accents in the foreign languages words and treat them as English as well.

## Install

You can install with [npm]:

```sh
$ npm install --save truly-unique
```

## Usage

The module provides two type of functions:
* Functions to deal with words: (`uniqueWords`, `repeatedWords` and `mostCommonWordsCount`)
* Functions to deal with phrases: (`uniquePhrases`, `repeatedPhrases`, `phrasesWithUniqueWords` and `phrasesWithRepeatedWords`)

Maybe the easiest way to understand the module is through and example. Lets get the text of the traditional Irish song [Molly Malone](https://en.wikipedia.org/wiki/Molly_Malone) and lets assign the lyrics to a variable, so we can start to answer questions.

```js
> const malone = 'In Dublin\'s fair city,\nWhere the girls are so pretty,\nI first set my eyes on sweet Molly Malone,\nAs she wheeled her wheel-barrow,\nThrough streets broad and narrow,\nCrying, "Cockles and mussels, alive, alive, oh!"\n"Alive, alive, oh,\nAlive, alive, oh,"\nCrying "Cockles and mussels, alive, alive, oh".\nShe was a fishmonger\nBut sure \'twas no wonder\nFor so were her father and mother before\nAnd they each wheel\'d their barrow\nThrough streets broad and narrow\nCrying "Cockles and mussels alive, alive oh!"\nShe died of a fever,\nAnd no one could save her,\nAnd that was the end of sweet Molly Malone.\nBut her ghost wheels her barrow,\nThrough streets broad and narrow,\nCrying, "Cockles and mussels, alive, alive, oh!"'
```

So maybe the first question you want to ask is what is the most common word on those lyrics?

```js
> const {mostCommonWordsCount} = require('truly-unique')
> mostCommonWordsCount(malone)
[ { key: 'alive', value: 10 },
  { key: 'and', value: 8 },
  { key: 'cockles', value: 4 }
  ...

// But if you want to remove the stopwords like 'and'
> const {mostCommonWordsCount} = require('truly-unique')
> mostCommonWordsCount(malone, {stopwords: true})
[ { key: 'alive', value: 10 },
  { key: 'cockles', value: 4 },
  { key: 'mussels', value: 4 },

```

Now lets say you want to find what words are unique on that text:

```js
> const {uniqueWords} = require('truly-unique')
> uniqueWords(malone)
[ 'in',
  'dublins',
  'fair',
  'city',
  'where',
  'girls',
  'are',
  'pretty',
  'i',
  'first',
  ...

  // But if you want to remove the stopwords like 'i'
> uniqueWords(malone, {stopwords: true})
[ 'dublins',
  'fair',
  'city',
  'girls',
  'pretty',
  'first',
  'set',
  'eyes',
  'wheeled',
  'wheelbarrow',
  'fishmonger',

```

The next step could be what are the unique phrases?

```js
> const {uniquePhrases} = require('truly-unique')
> uniquePhrases(malone)
[ 'In Dublin\'s fair city,',
  'Where the girls are so pretty,',
  'I first set my eyes on sweet Molly Malone,',
  'As she wheeled her wheel-barrow,',
  ...

```

Or repeated phrases as well:

```js
> const {repeatedPhrases} = require('truly-unique')
> repeatedPhrases(malone)
[ 'Through streets broad and narrow,',
  'Crying, "Cockles and mussels, alive, alive, oh!"',
  '"Alive, alive, oh,',
  'Alive, alive, oh,"',
  ...

```

And finally let's say you want to find if those lyrics have phrases composed of unique words across the text:

```js
> const {phrasesWithUniqueWords} = require('truly-unique')
> phrasesWithUniqueWords(malone)
[ 'In Dublin\'s fair city,' ]

// And ommiting the stop words again

> phrasesWithUniqueWords(malone, {stopwords: true})
[ 'In Dublin\'s fair city,',
  'Where the girls are so pretty,',
  'As she wheeled her wheel-barrow,',
  'She was a fishmonger',
  'But sure \'twas no wonder',
  'For so were her father and mother before',
  'She died of a fever,',
  'And no one could save her,' ]
>
```

### License

Copyright © 2019, [Juan Convers](https://juanconvers.com/).
Released under the [MIT License](LICENSE).
