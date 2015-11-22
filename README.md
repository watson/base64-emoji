# base64-emoji

Inspired by [base-emoji](https://github.com/pfraze/base-emoji) this
module allows for transformation of any binary data to and from emoji
using only 64 different emojicons (+1 for padding).

![emojo-all-the-things](https://cloud.githubusercontent.com/assets/10602/8368864/31a7982c-1b7e-11e5-8731-d1728ddfbafa.jpg)

[![Build status](https://travis-ci.org/watson/base64-emoji.svg?branch=master)](https://travis-ci.org/watson/base64-emoji)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![abstract-encoding](https://img.shields.io/badge/abstract--encoding-compliant-brightgreen.svg?style=flat)](https://github.com/mafintosh/abstract-encoding)

## Installation

```
npm install base64-emoji
```

## Usage

```js
var emoji = require('base64-emoji')

var encoded = emoji.encode('Hello World')
var decoded = emoji.decode(encoded)

console.log(encoded.toString()) // => 🍕📙🕡🌵🎎📙🚢😮🕡🐗🏦🕤🎎📙🕖📫
console.log(decoded.toString()) // => Hello World
```

## API

**`buffer = emoji.encode(buffer|string, [buffer], [offset])`**

The `encode` function takes a buffer or a string and returns a buffer
containing the encoded bytes. The optional 2nd buffer argument will be
used to store the encoded result. If not provided a new buffer will be
allocated. If an offset is passed as the 3rd argument the input will be
encoded into the buffer at that byte offset. The offset defauls to `0`.

**`buffer = emoji.decode(buffer|string, [offset], [length])`**

The `decode` function takes a buffer or a string and returns a buffer
containing the decoded bytes. If an offset is passed as the 2nd
argumetn, the input will be decoded from that byte offset. Tye byte
offset defaults to `0`. A length can be passed as the 3rd argument
specifying the number of bytes that should be decoded. The length
defaults to the input byte length.

**`length = emoji.encodingLength(buffer|string)`**

Returns the amount of bytes needed to encode the `buffer` or `string`
given as input.

## License

MIT
