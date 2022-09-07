// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')
const find = require('find-process')

const { spawn, fork } = require('child_process');
spawn('npm.cmd', ['run', 'start']);
fork(`${__dirname}/api/index`);

async function createWindow () {

  let process = await find('port', 3000);
  while (!process.length) {
    process = await find('port', 3000);
  }

  process = await find('port', 3001);
  while (!process.length) {
    process = await find('port', 3001);
  }

  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadURL('http://localhost:3000');
}

app.whenReady().then(() => {
    createWindow();
});

app.on('window-all-closed', function () {
  spawn('npm.cmd', ['run', 'stop-front-end']).on('exit', () => {
      spawn('npm.cmd', ['run', 'stop-back-end']).on('exit', () => {
          app.quit();
      });
  });
});