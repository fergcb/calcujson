# CalcuJSON
[![npm version](https://badge.fury.io/js/calcujson.svg)](https://badge.fury.io/js/calcujson)

## Installation
### NPM
```sh
npm install calcujson
```

### Yarn
```sh
yarn add calcujson
```

## Getting Started
```js
const { ComputationFactory, MapStore } = require('calcujson')

const store = new MapStore(),
      cf = new ComputationFactory(store)

const calc = cf.create({
  type: 'integer',
  value: 42,
  desc: 'The answer to life, the universe, and everything'
})

console.log(`${calc.describe()}: ${calc.evaluate()}`)
// >> The answer to life, the universe, and everything: 42
```

## What is CalcuJSON?
CalcuJSON is a standard for transmitting computable expressions through JSON formatted text.

The standard was designed to enable web APIs to tell the client how to make calculations using data not available to the API itself.
