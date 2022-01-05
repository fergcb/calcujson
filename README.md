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
  type: 'add',
  items: [
    { type: 'num', value: 1 },
    { type: 'num', value: 2, desc: 'II' },
    { type: 'num', value: 3, desc: 'three' },
  ]
}

const computation = parse(data)

console.log(computation.evaluate()) // >>> 6
console.log(computation.desc) // >>> 1 + II + three
```