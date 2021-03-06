const assert = require('nanoassert')
class Multiset {
  constructor (elements = [], key = x => x) {
    this.key = key
    this.data = new Map()
    this.counts = new Map()

    this._size = 0

    for (const elm of elements) {
      this.add(elm)
    }
  }

  get size () {
    return this._size
  }

  get uniqueSize () {
    return this.data.size
  }

  add (elm, n = 1) {
    assert(n > 0, 'n must be greater than 0')
    const key = this.key(elm)
    if (this.data.has(key) === false) {
      this.data.set(key, elm)
      this.counts.set(key, n)
    } else {
      this.counts.set(key, this.counts.get(key) + n)
    }

    this._size += n

    return this
  }

  delete (elm, n = 1) {
    assert(n > 0, 'n must be greater than 0')
    const key = this.key(elm)
    const count = this.counts.get(key)
    if (this.counts != null) {
      if (count > n) {
        this.counts.set(key, count - n)
        this._size -= n
        return true
      }

      this._size -= count
      this.counts.delete(key)
      this.data.delete(key)
      return true
    } else {
      return false
    }
  }

  has (elm) {
    const key = this.key(elm)
    return this.data.has(key)
  }

  count (elm) {
    const key = this.key(elm)
    return this.counts.get(key) || 0
  }

  equal (rhs) {
    assert(rhs instanceof Multiset, 'rhs must be Multiset')
    if (this.size !== rhs.size) return false
    if (this.uniqueSize !== rhs.uniqueSize) return false

    for (var [elm, count] of this.entries()) {
      if (rhs.count(elm) !== count) return false
    }

    return true
  }

  subset (superset) {
    assert(superset instanceof Multiset, 'superset must be Multiset')

    for (var [elm, count] of this.entries()) {
      if (superset.count(elm) < count) return false
    }

    return true
  }

  filter (fn) {
    var m = new Multiset([], this.key)

    for (const elm of this.data.values()) {
      var keep = fn(elm)
      if (keep) m.add(elm, this.count(elm))
    }

    return m
  }

  difference (b) {
    if (Array.isArray(b)) {
      const m = new Multiset(b, this.key)
      return this.difference(m)
    }

    if (b instanceof Multiset) {
      // do something
      const m = new Multiset([], this.key)

      for (const [elm, count] of this.entries()) {
        const otherCount = b.count(elm)
        const diff = count - otherCount
        if (diff > 0) m.add(elm, diff)
      }

      return m
    }

    throw new Error('Unsupported key rhs')
  }

  forEach (...args) {
    return [...this].forEach(...args)
  }

  map (...args) {
    return [...this].map(...args)
  }

  reduce (...args) {
    return [...this].reduce(...args)
  }

  clone () {
    var m = new Multiset([], this.key)

    for (const elm of this.data.values()) {
      var count = this.counts.get(this.key(elm))

      m.add(elm, count)
    }

    return m
  }

  * [Symbol.iterator] () {
    for (const elm of this.data.values()) {
      var count = this.counts.get(this.key(elm))

      while (count--) {
        yield elm
      }
    }
  }

  * entries () {
    for (const elm of this.data.values()) {
      var count = this.counts.get(this.key(elm))

      yield [elm, count]
    }
  }

  counts () {
    return this.counts.values()
  }

  values () {
    return this.data.values()
  }
}

module.exports = Multiset
