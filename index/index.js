const fs = require('fs')
const path = require('path')
const os = require('os')
const exec = require('child_process').exec;


function queryWeaselServer() {
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
                return
            }
        }

        alert('未找到小狼毫算法服务，请检查是否安装小狼毫')
    });
}


window.onload = () => {

    document.getElementById('cancel').addEventListener('click', function () {
        console.log('cancel')
    })

    document.getElementById('confirm').addEventListener('click', () => confirm())

    document.getElementById('reset').addEventListener('click', function () {
        console.log('reset')
    })


    queryWeaselServer()
}


function confirm() {
    console.log('confirm')

    backup_user_yaml_files()
    change_user_setting()
    deploy_weasel()
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

function change_user_setting() {
    // 2. 
    console.log('function : change_user_setting');
    const date = new Date().toString();
    const page_size = document.getElementById('page_size').value
    const horizontal = document.getElementById('candidate_horizontal').checked
    const simplified = document.getElementById('simplified').checked
    const schema_checked = Array.from(document.getElementsByName('schema')).filter(it => it.checked)[0].value

    const schema_array = {
        true: {
            double_pinyin: 'double_pinyin', // todo 简体双拼
            wubi: 'wubi86',
            pinyin: 'pinyin_simp' // 袖珍拼音的词库比 luna 好
        },
        false: {
            double_pinyin: 'double_pinyin',
            wubi: 'wubi_trad',
            pinyin: 'luna_pinyin'
        }
    };
    const schema = schema_array[simplified][schema_checked]

    console.log(`page_size : ${page_size}`);
    console.log(`horizontal : ${horizontal}`);
    console.log(`simplified : ${simplified}`);
    console.log(`schema : ${schema}`);

    // todo 需要防止 js 格式化将字符串模板的格式破坏

    const default_custom =
        `customization:
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

    const homedir = os.userInfo().homedir
    const rimedir = path.join(homedir, 'AppData/Roaming/Rime')
    const fiel_deault_yaml = path.join(rimedir, 'default.custom.yaml')

    fs.writeFileSync(fiel_deault_yaml, default_custom);
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