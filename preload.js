const { contextBridge, ipcRenderer } = require('electron')


window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
})


contextBridge.exposeInMainWorld('electronAPI', {
  alert: (callback) => ipcRenderer.on('alert', callback),

  queryWeaselServer: () => ipcRenderer.send('queryWeaselServer'),
  confirm: (default_custom, weasel_custom) => ipcRenderer.send('confirm', default_custom, weasel_custom),
  reset: () => ipcRenderer.send('reset'),
  openDevTools: () => ipcRenderer.send('openDevTools'),
})

