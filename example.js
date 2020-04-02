const Multiset = require('.')
const m = new Multiset([1, 1, 2, 3, 4, 4, 3, 8, 1])

console.log(m.count(1)) // => 3
console.log(m.count(4)) // => 2
console.log(m.size) // => 9
console.log(m.uniqueSize) // => 5

m.add(10)
console.log(m.size) // => 10
console.log(m.uniqueSize) // => 6
