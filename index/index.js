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

    // window.electronAPI.update_templates(t)
    console.log(t);
    console.log(t.weasel.patch);
    console.log(t.weasel.patch['style/horizontal']);
    console.log(t.weasel.patch['style/inline_preedit']);
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
  const schema_value = index_schema(simplified, schema_checked)

  const horizontal = document.getElementById('horizontal').checked
  const inline_preedit = document.getElementById('inline_preedit').checked

  console.log(`
    page_size : ${page_size}
    simplified : ${simplified}
    schema : ${schema_value}

    horizontal : ${horizontal}
    inline_preedit : ${inline_preedit}
  `);


  const t = window.electronAPI.require_templates()

  t.default.customization.modified_time = date
  t.default.patch['menu/page_size'] = page_size
  t.default.patch.schema_list = [{schema: schema_value}]

  t.weasel.customization.modified_time = date
  t.weasel.patch['style/horizontal'] = horizontal
  t.weasel.patch['style/inline_preedit'] = inline_preedit

  window.electronAPI.update_templates(t)
  window.electronAPI.save_settings()
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