'use strict'

var mime = require('./mime')
var emojis = require('./emojis')
var EMOJI_BYTE_SIZE = 4

exports.encode = function (obj, buf, offset) {
  if (typeof obj === 'string') obj = new Buffer(obj)
  else if (!Buffer.isBuffer(obj)) throw new Error('Invalid argument! Expected string or Buffer')

  if (!offset) offset = 0
  var oldOffset = offset

  var base64 = obj.toString('base64')
  if (!buf) buf = new Buffer(base64.length * EMOJI_BYTE_SIZE)
  var index

  for (var i = 0, l = base64.length; i < l; i++) {
    index = mime.indexOf(base64[i])
    if (index === -1) throw new Error('Invalid MIME base64 character: ' + base64[i])
    offset += buf.write(emojis[index], offset)
  }

  exports.encode.bytes = offset - oldOffset

  return buf
}

exports.decode = function (buf, offset, len) {
  if (typeof buf === 'string') buf = new Buffer(buf)
  else if (!Buffer.isBuffer(buf)) throw new Error('Invalid argument! Expected string or Buffer')

  if (offset === undefined) offset = 0
  if (len === undefined) len = buf.length

  var oldOffset = offset
  var base64 = ''
  var emoji, index

  while (offset < len) {
    emoji = buf.slice(offset, offset + EMOJI_BYTE_SIZE).toString()
    index = emojis.indexOf(emoji)
    if (index === -1) throw new Error('Invalid base64-emoji character: ' + emoji)
    base64 += mime[index]
    offset += EMOJI_BYTE_SIZE
  }

  exports.decode.bytes = offset - oldOffset

  return new Buffer(base64, 'base64')
}

exports.encodingLength = function (obj) {
  if (typeof obj === 'string') obj = new Buffer(obj)
  else if (!Buffer.isBuffer(obj)) throw new Error('Invalid argument! Expected string or Buffer')
  return obj.toString('base64').length * EMOJI_BYTE_SIZE
}
