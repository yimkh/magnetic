const { Menu } = require('electron')

const macOSTemplate = [
  // { role: 'appMenu' },
  {
    label: 'Sample',
    submenu: [
      { role: 'about' }
    ]
  },
  // { role: 'FileMenu' }
  {
    label: 'File',
    submenu: [
      { role: 'close' },
    ]
  },
  // { role: 'viewMenu' }
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forcereload' },
      { role: 'toggledevtools' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
]

let menu = undefined

function createDefaultMenu() {
  if (menu == undefined) {
    menu = Menu.buildFromTemplate(macOSTemplate)
  }

  return menu
}

module.exports = {
  createDefaultMenu
}
