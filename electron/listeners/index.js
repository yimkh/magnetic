const EventEmitter = require('events')

function Listener() {
  Listener.init.call(this)
}

Listener.init = function() {
  if (this.eventEmitter == undefined) {
    this.eventEmitter = new EventEmitter()
  }
}

function _addListener(target, event, handler) {
  target.eventEmitter.addListener(event, handler)
}

Listener.prototype.addListener = function(event, handler) {
  _addListener(this, event, handler)
}

function dispatch(target, event, args) {
  target.eventEmitter.emit(event, args)
}

Listener.prototype.register = function(target, events) {
  const that = this

  events.forEach(event => {
    target.on(event, (ev, ...data) => {
      dispatch(that, event, data)
    })
  })
}

module.exports = Listener
