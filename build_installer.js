// ./build_installer.js

// 1. Import Modules
const { MSICreator } = require('electron-wix-msi');
const path = require('path');

// 2. Define input and output directory.
// Important: the directories must be absolute, not relative e.g
// appDirectory: "C:\\Users\sdkca\Desktop\OurCodeWorld-win32-x64", 
const APP_DIR = path.resolve(__dirname, './CIOBrain-win32-x64');
// outputDirectory: "C:\\Users\sdkca\Desktop\windows_installer", 
const OUT_DIR = path.resolve(__dirname, './installers');

// 3. Instantiate the MSICreator
const msiCreator = new MSICreator({
    appDirectory: APP_DIR,
    outputDirectory: OUT_DIR,

    // Configure metadata
    description: 'CIOBrain trial',
    exe: 'CIOBrain',
    name: 'CIOBrain',
    manufacturer: 'Best Company',
    version: '1.0.0',
    ui: {
        chooseDirectory: true
    },
});

async function createMSI() {
    await msiCreator.create();
    await msiCreator.compile();
}

createMSI();