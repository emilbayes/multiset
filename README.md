# `@emilbayes/multiset`

[![Build Status](https://travis-ci.org/emilbayes/multiset.svg?branch=master)](https://travis-ci.org/emilbayes/multiset)

> Multiset implementation

## Usage

```js
const Multiset = require('@emilbayes/multiset')

const m = new Multiset([1, 1, 2, 3, 4, 4, 3, 8, 1])

console.log(m.count(1)) // => 3
console.log(m.count(4)) // => 2
console.log(m.size) // => 9
console.log(m.uniqueSize) // => 5

m.add(10)
console.log(m.size) // => 10
console.log(m.uniqueSize) // => 6
```

## API

### `var m = new Multiset([elements = []], [key = x => x])`

Create a new Multiset with optional initial array of `elements`, and optional
identity `key`, which defaults to strict equality.

### `const size = m.size`

Number of total elements in the Multiset.

### `const size = m.uniqueSize`

Number of unique elements in the Multiset.

### `const m = m.add(elm, [n = 1])`

Add `elm` to the Multiset, with optional multiplicity `n`.
Equality is checked with `key`.

### `const m = m.delete(elm, [n = 1])`

Delete `elm` from the Multiset, optionally decrementing by `n`.
If final count is 0 or less, the element is removed from the Multiset.
Equality is checked with `key`.

### `const bool = m.has(elm)`

Check for existence.

### `const n = m.count(elm)`

Count occurrences of `elm` in the Multiset.

### `const bool = m.equal(rhs)`

Check if `m` and `rhs` contain the same elements with same multiplicity.

### `const bool = m.subset(superset)`

Check if `m` is a subset of `superset`, meaning `superset` contain the same
elements with at least the least the same multiplicity as `m`.

### `const m2 = m.filter(fn)`

Filter unique elements from the Multiset, preserving count in the new Multiset.
A new Multiset is created but if the elements are not primitives, they will
share references between the two Multisets.

### `const m2 = m.difference(rhs)`

Find the difference `m \ rhs`, copying the Multiset with the difference
contained in the new Multiset. `rhs` can either be a `Multiset` or an `Array`.

### `m.forEach(fn, this)`

Iterate elements of the Multiset as an array, meaning elements with multiplicity
will be enumerated `n` times.

### `const arr = m.map(fn, this)`

Map elements of the Multiset as an array, meaning elements with multiplicity
will be enumerated `n` times. Returns the resulting array.

### `const arr = m.reduce(fn, [initialValue])`

Reduce elements of the Multiset as an array, meaning elements with multiplicity
will be enumerated `n` times. Returns the resulting accumulated value.

### `const m2 = m.clone()`

Clone the Multiset.
A new Multiset is created but if the elements are not primitives, they will
share references between the two Multisets.

### `for (const elm of m) ...`

Iterate elements of the Multiset with multiplicity.

### `const iterator = m.entries()`

Iterate `[elm, multiplicity]` of the Multiset.

### `const iterator = m.counts()`

Iterate `multiplicity` of the Multiset.

### `const iterator = m.values()`

Iterate unqiue `elm` of the Multiset.

## Install

```sh
npm install @emilbayes/multiset
```

## License

[ISC](LICENSE)
