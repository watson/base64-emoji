# base64-emoji

Inspired by [base-emoji](https://github.com/pfraze/base-emoji) this
module allows for transformation of any binary data to and from emoji
using only 64 different emojicons.

[![Build status](https://travis-ci.org/watson/base64-emoji.svg?branch=master)](https://travis-ci.org/watson/base64-emoji)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

## Installation

```
npm i base64-emoji
```

## Usage

```js
var base64Emoji = require('base64-emoji')

var encoded = base64Emoji.encode('Hello World')
var decoded = base64Emoji.decode(encoded)

console.log(encoded.toString()) // => 🍕📙🕡0⃣🎎📙🉑😮🕡🐗🏦🕤🎎📙🕖📫
console.log(decoded.toString()) // => Hello World
```

## API

**`encode(buffer|string)`**

The `encode` function takes a buffer or a string and returns a buffer
containing the encoded bytes.

**`decode(buffer|string)`**

The `decode` function takes a buffer or a string and returns a buffer
containing the decoded bytes.

## License

MIT
