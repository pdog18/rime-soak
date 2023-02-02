window.addEventListener("load", () => {
  const file = window.electronAPI.readFileSync('yaml-templates/punctuation.yaml', 'utf8')
  const yaml = window.electronAPI.yamlParseSync(file)
  render_punct_page(yaml)

  document.getElementById('test').addEventListener('click', () => {
    console.log('test');
  })
})

function render_punct_page(yaml) {
  const full_shape = yaml.full_shape
  const half_shape = yaml.half_shape
  const ascii_style = yaml.ascii_style

  let innerHtml = `<div class="symbols-item">
    <div class="symbols-title">符号</div>
    <div class="symbols-title">中文半角</div>
    <div class="symbols-title">中文全角</div>
    <div class="symbols-title">英文</div>
  </div>
  `

  for (const key in yaml.full_shape) {
    console.log(`key ${key}   = value ${yaml.full_shape[key]} `);

    innerHtml += `
    <div class="symbols-item">
      <div class="symbols-name">${key}</div>
      <input value="${pString(yaml.full_shape[key])}"></input>
      <input value="${pString(yaml.half_shape[key])}"></input>
      <input value="${pString(yaml.ascii_style[key])}"></input>
    </div>
    `
  }
  document.getElementById('symbols').innerHTML = innerHtml
}

function pString(p) {
  if (p == undefined) {
    return '!!!undefined'
  }

  if (typeof p == 'string') {
    return p
  }

  if (p instanceof Array) {
    return p
  }

  if (p['commit'] == undefined) {
    return p['pair']
  }

  return p['commit']
}

