const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let mainWindow;
let pythonProcess = null;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 400,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadFile('index.html');
});

ipcMain.handle('select-folder', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openDirectory'],
  });
  return result.filePaths[0] || null;
});

ipcMain.on('start-organizer', (event, folderPath) => {
  if (pythonProcess) {
    event.sender.send('organizer-error', 'File organizer is already running.');
    return;
  }

  pythonProcess = spawn('python', ['backend.py', folderPath]);

  pythonProcess.stdout.on('data', (data) => {
    event.sender.send('organizer-status', data.toString());
  });

  pythonProcess.stderr.on('data', (data) => {
    event.sender.send('organizer-error', data.toString());
  });

  pythonProcess.on('close', (code) => {
    event.sender.send('organizer-stopped', `Organizer stopped (code ${code}).`);
    pythonProcess = null;
  });
});

ipcMain.on('stop-organizer', (event) => {
  if (pythonProcess) {
    pythonProcess.kill();
    pythonProcess = null;
    event.sender.send('organizer-stopped', 'Organizer process stopped manually.');
  } else {
    event.sender.send('organizer-error', 'No process running to stop.');
  }
});
