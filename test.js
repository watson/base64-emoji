'use strict'

var test = require('tape')
var base64emoji = require('./')

test('encode - string (no padding)', function (t) {
  t.deepEqual(base64emoji.encode('foo'), new Buffer('💍🍑🏦🚸'))
  t.end()
})

test('decode - string (no padding)', function (t) {
  t.deepEqual(base64emoji.decode('💍🍑🏦🚸'), new Buffer('foo'))
  t.end()
})

test('encode - buffer (no padding)', function (t) {
  t.deepEqual(base64emoji.encode(new Buffer('foo')), new Buffer('💍🍑🏦🚸'))
  t.end()
})

test('decode - buffer (no padding)', function (t) {
  t.deepEqual(base64emoji.decode(new Buffer('💍🍑🏦🚸')), new Buffer('foo'))
  t.end()
})

test('encode - string (with padding)', function (t) {
  t.deepEqual(base64emoji.encode('fo'), new Buffer('💍🍑🉑📫'))
  t.end()
})

test('decode - string (with padding)', function (t) {
  t.deepEqual(base64emoji.decode('💍🍑🉑📫'), new Buffer('fo'))
  t.end()
})

test('encode -> decode', function (t) {
  t.deepEqual(base64emoji.decode(base64emoji.encode(new Buffer('foo'))), new Buffer('foo'))
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
  t.equal(base64emoji.encode('').toString(), '')
  t.end()
})

test('decode - empty string', function (t) {
  t.equal(base64emoji.decode('').toString(), '')
  t.end()
})
