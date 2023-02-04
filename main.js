const { app, Menu, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const YAML = require('yaml');
const exec = require('child_process').exec;
const os = require('os');


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
    save_settings()
    change_user_setting(default_custom, weasel_custom)
    deploy_weasel()
  })
  ipcMain.on('reset', (event, _value) => {
    console.log('reset');
    reset(event.sender)
  })
  ipcMain.on('queryWeaselServer', (event, _value) => {
    queryWeaselServer(event.sender)
    backup_user_yaml_files()
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

// TODO
function save_settings() {
  // templates.default  -> default.custom.yaml

  // templates.weasel  -> weasel.custom.yaml

  // templates.schema  -> `schema`.custom.yaml
}

function reset(webContents) {
  // 把 Rime/backup_user_yaml 中的文件复制到 Rime 中
  const homedir = os.userInfo().homedir
  const rimedir = path.join(homedir, 'AppData/Roaming/Rime')

  const backup_dir = path.join(rimedir, `backup_user_yaml`)
  if (!fs.existsSync(backup_dir)) {
    webContents.send('alert', `无备份文件，无法进行恢复操作.`)
    return
  }

  const files = fs.readdirSync(backup_dir)
  for (const file of files) {
    if (file.endsWith('.yaml')) {
      console.log(file);
      const yaml = path.join(backup_dir, file)
      fs.copyFileSync(yaml, path.join(rimedir, file))
    }
  }

  deploy_weasel()
  webContents.send('alert', "恢复成功")
}

function deploy_weasel() {
  // 3. 执行重新部署操作
  const weasel_deployer_path = "C:/Program Files (x86)/Rime/weasel-0.14.3/WeaselDeployer.exe"
  const depoly_arg = '/deploy'
  // exec(`${weasel_deployer_path} ${depoly_arg}`);

  console.log(`>>> function : deploy_weasel`);
  exec('"C:/Program Files (x86)/Rime/weasel-0.14.3/WeaselDeployer.exe" /deploy');
  console.log(`<<< function : deploy_weasel`);
}

function backup_user_yaml_files() {
  // 1. 将用户的 .yaml 放入 backup 文件夹进行备份
  const homedir = os.userInfo().homedir
  const rimedir = path.join(homedir, 'AppData/Roaming/Rime')

  const backup_dir = path.join(rimedir, `backup_user_yaml`)
  if (fs.existsSync(backup_dir)) {
    console.log('已经存在 backup_user_yaml 文件夹');
    return
  }

  fs.mkdirSync(backup_dir);
  console.log('创建 backup_user_yaml 文件夹成功');
  console.log(`开始备份 yaml 文件至 ${backup_dir}`);

  const files = fs.readdirSync(rimedir)
  for (const file of files) {
    if (file.endsWith('.yaml')) {
      console.log(file);
      const yaml = path.join(rimedir, file)
      fs.copyFileSync(yaml, path.join(backup_dir, file))
    }
  }
}


function  queryWeaselServer(webContents) {
  exec('tasklist', function (error, stdout, stderr) {
    if (error) {
      console.error('error: ' + error);
      return;
    }
    // console.log('stdout: ' + stdout); 输出所有进程名字
    const process_list = stdout.split('\n')
    for (const process of process_list) {
      if (process.startsWith('WeaselServer.exe')) {
        console.log('存在小狼毫算法服务')
        // webContents.send('alert', "存在小狼毫算法服务")
        return
      }
    }

    webContents.send('alert', "未找到小狼毫算法服务，请检查是否安装小狼毫")
  });
}


function change_user_setting(default_custom, weasel_custom) {
  // 2. 修改用户文件夹的 .yaml 文件
  const rimedir = path.join(os.userInfo().homedir, 'AppData/Roaming/Rime')

  const file_deault_yaml = path.join(rimedir, 'default.custom.yaml')

  fs.writeFileSync(file_deault_yaml, default_custom);

  const file_weasel_yaml = path.join(rimedir, 'weasel.custom.yaml')
  fs.writeFileSync(file_weasel_yaml, weasel_custom);

  console.log('File is created successfully.');
}