const { app } = require('electron')

const { addListener, execute } = require('./listeners')
const { createWindow, onActivateWindow } = require('./listeners/window')

addListener('ready', createWindow)
addListener('activate', onActivateWindow)
addListener('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

execute(app)
