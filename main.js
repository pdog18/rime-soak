const { app, Menu, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');
const exec = require('child_process').exec;


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
  ipcMain.on('confirm', (_event, _value) => {
    backup_user_yaml_files()
    change_user_setting()
    deploy_weasel()
  })
  ipcMain.on('reset', (event, _value) => {
    reset(event.sender)
  })
  ipcMain.on('queryWeaselServer', (event, _value) => {
    queryWeaselServer(event.sender)
  })

  ipcMain.on('on-query-server', (_event, value) => {
    console.log(value)
  })

  ipcMain.on('openDevTools', (event, _value) => {
    console.log('openDevTools');
    event.sender.openDevTools({ mode: 'detach' })
  })
  createWindow()


  // 隐藏菜单栏
  Menu.setApplicationMenu(null);
  // hide menu for Mac 
  if (process.platform !== 'darwin') {
    app.dock.hide();
  }

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})


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


function change_user_setting() {
  // 2. 修改用户文件夹的 .yaml 文件
  console.log('>>> function : change_user_setting');
  const date = new Date().toString();
  const page_size = document.getElementById('page_size').value
  const simplified = document.getElementById('simplified').checked
  const schema_checked = Array.from(document.getElementsByName('schema')).filter(it => it.checked)[0].value
  const schema = index_schema(simplified, schema_checked)

  const horizontal = document.getElementById('horizontal').checked
  const inline_preedit = document.getElementById('inline_preedit').checked


  console.log(`
    page_size : ${page_size}
    simplified : ${simplified}
    schema : ${schema}

    horizontal : ${horizontal}
    inline_preedit : ${inline_preedit}
  `);


  // todo 需要防止 js 格式化将字符串模板的格式破坏

  const default_custom =
    `
# default.custom.yaml
# generate by Soak
customization:
  distribution_code_name: Weasel
  distribution_version: 0.14.3_dev_0.8
  generator: "Rime::SwitcherSettings"
  modified_time: "${date}"
  rime_version: 1.7.3
patch:
  menu/page_size: ${page_size}
  schema_list:
    - {schema: ${schema}}
`

  const weasel_custom =
    `
# weasel.custom.yaml
# generate by Soak
customization:
  distribution_code_name: Weasel
  distribution_version: 0.14.3_dev_0.8
  generator: "Rime::SwitcherSettings"
  modified_time: "${date}"
  rime_version: 1.7.3
patch:
  style/horizontal: ${horizontal}
  style/inline_preedit: ${inline_preedit}
`

  const rimedir = path.join(os.userInfo().homedir, 'AppData/Roaming/Rime')

  const file_deault_yaml = path.join(rimedir, 'default.custom.yaml')
  fs.writeFileSync(file_deault_yaml, default_custom);

  const file_weasel_yaml = path.join(rimedir, 'weasel.custom.yaml')
  fs.writeFileSync(file_weasel_yaml, weasel_custom);

  console.log('File is created successfully.');
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


function index_schema(simplified, schema_checked) {
  const schema_array = {
    true: {
      double_pinyin: 'double_pinyin', // todo 目前没有简体双拼
      wubi: 'wubi86',
      pinyin: 'pinyin_simp' // 袖珍拼音的词库比 luna 好
    },
    false: {
      double_pinyin: 'double_pinyin',
      wubi: 'wubi_trad',
      pinyin: 'luna_pinyin'
    }
  };
  return schema_array[simplified][schema_checked];
}

function reset(webContents) {
  // 把 Rime/backup_user_yaml 中的文件复制到 Rime 中
  const homedir = os.userInfo().homedir
  const rimedir = path.join(homedir, 'AppData/Roaming/Rime')

  const backup_dir = path.join(rimedir, `backup_user_yaml`)
  if (!fs.existsSync(backup_dir)) {
    send_alert(webContents, `无备份文件，无法进行恢复操作. `)
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
}

function queryWeaselServer(webContents) {
  exec('tasklist', function (error, stdout, stderr) {
    if (error) {
      console.error('error: ' + error);
      return;
    }
    console.log('stdout: ' + stdout);
    const process_list = stdout.split('\n')
    for (const process of process_list) {
      if (process.startsWith('WeaselServer.exe')) {
        console.log('存在小狼毫算法服务')
        // send_alert(webContents, "存在小狼毫算法服务")
        return
      }
    }
    send_alert(webContents, "未找到小狼毫算法服务，请检查是否安装小狼毫")
  });
}

function send_alert(webContents, value) {
  webContents.send('alert', value)
}