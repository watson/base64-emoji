'use strict'

var test = require('tape')
var base64emoji = require('./')

test('encode - string (no padding)', function (t) {
  base64emoji.encode.bytes = 0
  t.deepEqual(base64emoji.encode('foo'), new Buffer('💍🍑🏦🚸'))
  t.equal(base64emoji.encode.bytes, 16)
  t.end()
})

test('decode - string (no padding)', function (t) {
  base64emoji.decode.bytes = 0
  t.deepEqual(base64emoji.decode('💍🍑🏦🚸'), new Buffer('foo'))
  t.equal(base64emoji.decode.bytes, 16)
  t.end()
})

test('encode - buffer (no padding)', function (t) {
  base64emoji.encode.bytes = 0
  t.deepEqual(base64emoji.encode(new Buffer('foo')), new Buffer('💍🍑🏦🚸'))
  t.equal(base64emoji.encode.bytes, 16)
  t.end()
})

test('decode - buffer (no padding)', function (t) {
  base64emoji.decode.bytes = 0
  t.deepEqual(base64emoji.decode(new Buffer('💍🍑🏦🚸')), new Buffer('foo'))
  t.equal(base64emoji.decode.bytes, 16)
  t.end()
})

test('encode - string (with padding)', function (t) {
  base64emoji.encode.bytes = 0
  t.deepEqual(base64emoji.encode('fo'), new Buffer('💍🍑🚢📫'))
  t.equal(base64emoji.encode.bytes, 16)
  t.end()
})

test('decode - string (with padding)', function (t) {
  base64emoji.decode.bytes = 0
  t.deepEqual(base64emoji.decode('💍🍑🚢📫'), new Buffer('fo'))
  t.equal(base64emoji.decode.bytes, 16)
  t.end()
})

test('encode - custom output buffer', function (t) {
  base64emoji.encode.bytes = 0
  var buf = new Buffer(20)
  buf.fill(0)
  base64emoji.encode('foo', buf)
  t.deepEqual(buf, new Buffer('f09f928df09f8d91f09f8fa6f09f9ab800000000', 'hex'))
  t.equal(base64emoji.encode.bytes, 16)
  t.end()
})

test('encode - custom output offset', function (t) {
  base64emoji.encode.bytes = 0
  var buf = new Buffer(20)
  buf.fill(0)
  base64emoji.encode('foo', buf, 2)
  t.deepEqual(buf, new Buffer('0000f09f928df09f8d91f09f8fa6f09f9ab80000', 'hex'))
  t.equal(base64emoji.encode.bytes, 16)
  t.end()
})

test('decode - custom offset', function (t) {
  base64emoji.decode.bytes = 0
  var buf = new Buffer('00000000f09f928df09f8d91f09f8fa6f09f9ab8', 'hex')
  t.deepEqual(base64emoji.decode(buf, 4), new Buffer('foo'))
  t.equal(base64emoji.decode.bytes, 16)
  t.end()
})

test('decode - custom length', function (t) {
  base64emoji.decode.bytes = 0
  var buf = new Buffer('0000f09f928df09f8d91f09f8fa6f09f9ab80000', 'hex')
  t.deepEqual(base64emoji.decode(buf, 2, 18), new Buffer('foo'))
  t.equal(base64emoji.decode.bytes, 16)
  t.end()
})

test('encode -> decode', function (t) {
  base64emoji.encode.bytes = 0
  base64emoji.decode.bytes = 0
  t.deepEqual(base64emoji.decode(base64emoji.encode(new Buffer('foo'))), new Buffer('foo'))
  t.equal(base64emoji.encode.bytes, 16)
  t.equal(base64emoji.decode.bytes, 16)
  t.end()
})

test('encode - number', function (t) {
  t.throws(base64emoji.encode.bind(null, 42))
  t.end()
})

test('decode - number', function (t) {
  t.throws(base64emoji.decode.bind(null, 42))
  t.end()
})

test('encode - no input', function (t) {
  t.throws(base64emoji.encode)
  t.end()
})

test('decode - no input', function (t) {
  t.throws(base64emoji.decode)
  t.end()
})

test('encode - empty string', function (t) {
  base64emoji.encode.bytes = 42
  t.equal(base64emoji.encode('').toString(), '')
  t.equal(base64emoji.encode.bytes, 0)
  t.end()
})

test('decode - empty string', function (t) {
  base64emoji.decode.bytes = 42
  t.equal(base64emoji.decode('').toString(), '')
  t.equal(base64emoji.decode.bytes, 0)
  t.end()
})

test('encodingLength - string (no padding)', function (t) {
  t.deepEqual(base64emoji.encodingLength('foo'), 16)
  t.end()
})

test('encodingLength - buffer (no padding)', function (t) {
  t.deepEqual(base64emoji.encodingLength(new Buffer('foo')), 16)
  t.end()
})

test('encodingLength - string (with padding)', function (t) {
  t.deepEqual(base64emoji.encodingLength('fo'), 16)
  t.end()
})

test('encodingLength - number', function (t) {
  t.throws(base64emoji.encodingLength.bind(null, 42))
  t.end()
})

test('encodingLength - no input', function (t) {
  t.throws(base64emoji.encodingLength)
  t.end()
})

test('encodingLength - empty string', function (t) {
  t.equal(base64emoji.encodingLength(''), 0)
  t.end()
})
