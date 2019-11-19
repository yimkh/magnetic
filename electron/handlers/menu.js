const { Menu } = require('electron')
const { createDefaultMenu } = require('../menu')

function onCreateMenu() {
    Menu.setApplicationMenu(createDefaultMenu())
}

module.exports = {
  onCreateMenu,
}
