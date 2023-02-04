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
  readFileSync: (path, encode) => ipcRenderer.sendSync('read-file-sync', path, encode),
  yamlParseSync: (file) => ipcRenderer.sendSync('yaml-parse-sync', file),

  // requireParseDataByName: (name) => ipcRenderer.sendSync('require-parse-data', name),
  // updateParseDataByName: (name, data) => ipcRenderer.sendSync('update-parse-data', name, data),

  require_templates: () => ipcRenderer.sendSync('require-templates'),
  update_templates: (templates) => ipcRenderer.send('update-templates', templates),
})