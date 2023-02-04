const exec = require('child_process').exec;
const path = require('path');
const fs = require('fs');
const os = require('os');

const PageGeneral = {
  queryWeaselServer: function (webContents) {
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
  },

  deploy_weasel: function () {
    // 3. 执行重新部署操作
    const weasel_deployer_path = "C:/Program Files (x86)/Rime/weasel-0.14.3/WeaselDeployer.exe"
    const depoly_arg = '/deploy'
    // exec(`${weasel_deployer_path} ${depoly_arg}`);

    console.log(`>>> function : deploy_weasel`);
    exec('"C:/Program Files (x86)/Rime/weasel-0.14.3/WeaselDeployer.exe" /deploy');
    console.log(`<<< function : deploy_weasel`);
  },


  reset: function (webContents) {
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

    this.deploy_weasel()
    webContents.send('alert', "恢复成功")
  },


  change_user_setting: function (default_custom, weasel_custom) {
    // 2. 修改用户文件夹的 .yaml 文件
    const rimedir = path.join(os.userInfo().homedir, 'AppData/Roaming/Rime')

    const file_deault_yaml = path.join(rimedir, 'default.custom.yaml')
    
    fs.writeFileSync(file_deault_yaml, default_custom);

    const file_weasel_yaml = path.join(rimedir, 'weasel.custom.yaml')
    fs.writeFileSync(file_weasel_yaml, weasel_custom);

    console.log('File is created successfully.');
  },



  backup_user_yaml_files: function () {
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
}


module.exports = PageGeneral;