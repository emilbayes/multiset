const test = require('tape')
const Multiset = require('.')

test('simple', function (assert) {
  const m = new Multiset([1, 1, 2, 3, 4, 4, 3, 8, 1])
  const m2 = m.clone()
  assert.equal(m.count(1), 3)
  assert.equal(m.count(4), 2)
  assert.equal(m.size, 9)
  assert.equal(m.uniqueSize, 5)

  m.add(4, 4)
  assert.equal(m.count(4), 6)
  assert.equal(m.size, 13)
  assert.equal(m.uniqueSize, 5)
  m.delete(4, 4)
  assert.equal(m.count(4), 2)
  assert.equal(m.size, 9)
  assert.equal(m.uniqueSize, 5)

  m.delete(4, 2)
  assert.equal(m.count(4), 0)
  assert.equal(m.size, 7)
  assert.equal(m.uniqueSize, 4)

  const m3 = m2.filter(n => n > 2)
  assert.notOk(m3.has(1))
  assert.notOk(m3.has(2))
  assert.ok(m3.has(3))
  assert.ok(m3.has(4))
  assert.ok(m3.has(8))

  assert.end()
})
