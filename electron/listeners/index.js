let listeners = {}

function addListener(event, handler) {
  if (listeners[event] == undefined) {
    listeners[event] = [handler]
  } else {
    listeners[event].push(handler)
  }
}

function execute(app) {
  for (const event of Object.keys(listeners)) {
    listeners[event].forEach(handler => {
      app.on(event, handler)
    })
  }
}

module.exports = {
    addListener,
    execute
}
