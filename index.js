'use strict'

var mime = require('./mime')
var emojis = require('./emojis')
var EMOJI_BYTE_SIZE = 4

exports.encode = function (buf) {
  if (typeof buf === 'string') buf = new Buffer(buf)
  else if (!Buffer.isBuffer(buf)) throw new Error('Invalid argument! Expected string or Buffer')

  var base64 = buf.toString('base64')
  var result = new Buffer(base64.length * EMOJI_BYTE_SIZE)
  var index

  for (var i = 0, l = base64.length; i < l; i++) {
    index = mime.indexOf(base64[i])
    if (index === -1) throw new Error('Invalid MIME base64 character: ' + base64[i])
    result.write(emojis[index], i * EMOJI_BYTE_SIZE)
  }

  return result
}

exports.decode = function (buf) {
  if (typeof buf === 'string') buf = new Buffer(buf)
  else if (!Buffer.isBuffer(buf)) throw new Error('Invalid argument! Expected string or Buffer')

  var emojisUsed = buf.length / EMOJI_BYTE_SIZE
  var base64 = ''
  var emoji, index

  for (var n = 0; n < emojisUsed; n++) {
    emoji = buf.slice(n * EMOJI_BYTE_SIZE, n * EMOJI_BYTE_SIZE + EMOJI_BYTE_SIZE).toString()
    index = emojis.indexOf(emoji)
    if (index === -1) throw new Error('Invalid base64-emoji character: ' + emoji)
    base64 += mime[index]
  }

  return new Buffer(base64, 'base64')
}
