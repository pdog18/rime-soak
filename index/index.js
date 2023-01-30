const fs = require('fs')

window.onload = () => {

    document.getElementById('cancel').addEventListener('click', function () {
        console.log('cancel')
    })

    document.getElementById('confirm').addEventListener('click', function () {

        console.log('confirm')
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

        const content =
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
  "switcher/hotkeys":  
    - "Control+grave" 
`

        // todo 1. 将用户的 .yaml 放入 backup 文件夹进行备份

        // todo 2. 将这里的 .yaml 写在 [用户文件夹(win)] 内
        fs.writeFile('test.yaml', content, function (err) {
            if (err) throw err;
            console.log('File is created successfully.');
        })

        // todo 3. 执行重新部署操作
        // "C:\Program Files (x86)\Rime\weasel-0.14.3\WeaselDeployer.exe" /deploy
    })

    document.getElementById('reset').addEventListener('click', function () {
        console.log('reset')
    })
}