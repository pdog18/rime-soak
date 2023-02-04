window.electronAPI.alert((_event, value) => {
  alert(value)
})


window.addEventListener(
  'keydown', (e) => {
    const { altKey, ctrlKey, key } = e;
    //  alt + ctrl + l
    if (altKey && ctrlKey && key === 'l') {
      window.electronAPI.openDevTools()
      e.preventDefault();
    }
  }, false
);

window.addEventListener('load', () => {
  window.electronAPI.queryWeaselServer()

  document.getElementById('confirm').addEventListener('click', confirm)

  document.getElementById('reset').addEventListener('click', () => window.electronAPI.reset())

  document.getElementById('test').addEventListener('click', () => {

    console.log('click');
    const t = window.electronAPI.require_templates()
    t.default.customization.changename = 'changed...2023.2.4'
    window.electronAPI.update_templates(t)
  })

})

// window.onload =

/**
 * todo 在这里应该不仅仅获取一个页面上的数据，而是全部的数据，然后提交给 main.js 
 */
function confirm() {
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

  window.electronAPI.confirm(default_custom, weasel_custom)
}




/**
 * utils function
 */
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