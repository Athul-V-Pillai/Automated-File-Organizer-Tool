const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  selectFolder: () => ipcRenderer.invoke('select-folder'),
  startOrganizer: (folderPath) => ipcRenderer.send('start-organizer', folderPath),
  stopOrganizer: () => ipcRenderer.send('stop-organizer'),
  onStatus: (callback) => ipcRenderer.on('organizer-status', callback),
  onError: (callback) => ipcRenderer.on('organizer-error', callback),
  onStopped: (callback) => ipcRenderer.on('organizer-stopped', callback),
});
