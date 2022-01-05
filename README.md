# CalcuJSON
*A standard for transmitting computable expressions in JSON formatted text.*

# Installation

```sh
yarn add calcujson
```

```sh
npm i calcujson
```

# Usage

```js
import CalcuJSON from 'calcujson'
const parse = CalcuJSON()

const data = {
  type: 'num',
  value: 42,
  desc: 'The answer to life, the universe, and everything'
}

const computation = parse(data)

console.log(computation.evaluate()) // >>> 42
console.log(computation.desc) // >>> "The answer to life, the universe, and everything"
```