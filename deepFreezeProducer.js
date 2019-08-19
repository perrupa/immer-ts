// This wraps Immer's produce() to deeply freeze all objects, all the time, when in development mode.
// See: https://github.com/immerjs/immer/issues/260#issuecomment-443708874
const {Immer} = require('immer')
const deepFreeze = require('deep-freeze')
const isPlainObject = require('is-plain-obj')

const {produce} = new Immer({
  onAssign(state, prop, value) {
    if (!isPlainObject(value) && !Array.isArray(value)) return
    if (!Object.isFrozen(value)) deepFreeze(value)
  }
})

module.exports.default = produce