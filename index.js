'use strict'

var mime = require('./mime')
var emojis = require('./emojis')
var emojiByteSize = 4

exports.encode = function (buf) {
  if (typeof buf === 'string') buf = new Buffer(buf)
  else if (!Buffer.isBuffer(buf)) throw new Error('Invalid argument! Expected string or Buffer')

  var base64 = buf.toString('base64')
  var result = new Buffer(base64.length * emojiByteSize)
  var index

  for (var n = 0; n < base64.length; n++) {
    index = mime.indexOf(base64[n])
    if (index === -1) throw new Error('Invalid MIME base64 character: ' + base64[n])
    result.write(emojis[index], n * emojiByteSize)
  }

  return result
}

exports.decode = function (buf) {
  if (typeof buf === 'string') buf = new Buffer(buf)
  else if (!Buffer.isBuffer(buf)) throw new Error('Invalid argument! Expected string or Buffer')

  var emojisUsed = buf.length / emojiByteSize
  var base64 = ''
  var emoji, index

  for (var n = 0; n < emojisUsed; n++) {
    emoji = buf.slice(n * emojiByteSize, n * emojiByteSize + emojiByteSize).toString()
    index = emojis.indexOf(emoji)
    if (index === -1) throw new Error('Invalid base64-emoji character: ' + emoji)
    base64 += mime[index]
  }

  return new Buffer(base64, 'base64')
}
