// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')

const { spawn } = require('child_process');
spawn('npm', ['run', 'start']);

function createWindow () {

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadURL('http://localhost:3000').catch(e => {
      setTimeout(() => {
        mainWindow.loadURL('http://localhost:3000')
      }, 1000).catch(e => {
          app.quit();
      });
  });

}

app.whenReady().then(() => {
    createWindow();
});

app.on('window-all-closed', function () {
  spawn('npm', ['run', 'stop']).on('exit', () => {
    app.quit();
  });
});