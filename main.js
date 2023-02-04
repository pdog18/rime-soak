const { app, Menu, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const YAML = require('yaml');

const PageGeneral = require('./script/page-general.js')

try {
  require('electron-reloader')(module, {});
} catch (_) { }


let templates = {
  default: {},
  weasel: {},
  punctuation: {},
  symbols: {},
  schema: {}
}

const createWindow = () => {
  const win = new BrowserWindow({
    minWidth: 800,
    minHeight: 600,
    maxHeight: 700,
    maxWidth: 1200,
    width: 836,
    height: 600,
    icon: path.join(__dirname, 'pdog.png'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index/index.html')
}


app.whenReady().then(() => {
  init_templates()

  ipcMain.on('read-file-sync', (event, file_path, encode, callback) => {
    event.returnValue = fs.readFileSync(path.join(__dirname, file_path), encode)
  })

  ipcMain.on('yaml-parse-sync', (event, file) => {
    event.returnValue = YAML.parse(file)
  })

  ipcMain.on('require-templates', (event) => {
    event.returnValue = templates
  })


  ipcMain.on('update-templates', (event, value) => {
    templates = value
  })

  ipcMain.on('confirm', (_event, default_custom, weasel_custom) => {
    PageGeneral.backup_user_yaml_files()
    PageGeneral.change_user_setting(default_custom, weasel_custom)
    PageGeneral.deploy_weasel()
  })
  ipcMain.on('reset', (event, _value) => {
    console.log('reset');
    PageGeneral.reset(event.sender)
  })
  ipcMain.on('queryWeaselServer', (event, _value) => {
    PageGeneral.queryWeaselServer(event.sender)
  })


  ipcMain.on('openDevTools', (event, _value) => {
    console.log('openDevTools');
    event.sender.openDevTools({ mode: 'detach' })
  })
  createWindow()


  // 隐藏菜单栏
  Menu.setApplicationMenu(null);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

function init_templates() {

  templates.default = YAML.parse(fs.readFileSync(path.join(__dirname, './templates/default.custom.yaml.template'), 'utf-8'))

  templates.punctuation = YAML.parse(fs.readFileSync(path.join(__dirname, './templates/punctuation.yaml.template'), 'utf-8'))

  templates.schema = YAML.parse(fs.readFileSync(path.join(__dirname, './templates/schema.custom.yaml.template'), 'utf-8'))

  templates.symbols = YAML.parse(fs.readFileSync(path.join(__dirname, './templates/symbols.yaml.template'), 'utf-8'))

  templates.weasel = YAML.parse(fs.readFileSync(path.join(__dirname, './templates/weasel.custom.yaml.template'), 'utf-8'))
}