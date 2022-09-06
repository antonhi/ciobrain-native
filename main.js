// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')

const { spawn, fork } = require('child_process');
spawn('npm', ['run', 'start']);
fork(`${__dirname}/api/index`);

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
        mainWindow.loadURL('http://localhost:3000').catch(e => {
            app.quit();
        });
      }, 2000)
  });

}

app.whenReady().then(() => {
    createWindow();
});

app.on('window-all-closed', function () {
  spawn('npm', ['run', 'stop-front-end']).on('exit', () => {
      spawn('npm', ['run', 'stop-back-end']).on('exit', () => {
          app.quit();
      });
  });
});