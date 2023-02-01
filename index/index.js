
window.onload = () => {

  window.electronAPI.queryWeaselServer()

  document.getElementById('confirm').addEventListener('click', () => window.electronAPI.confirm())

  document.getElementById('reset').addEventListener('click', () => window.electronAPI.reset())
}

window.electronAPI.alert((_event, value) => {
  alert(value)
})

window.addEventListener(
  'keydown',
  (e) => {
    const { altKey, ctrlKey, key } = e;

    console.log(`altKey ${altKey}
      ctrlKey ${ctrlKey}
      key ${key}

      e ${e}
      `);
    //  alt + ctrl + (Command | Windows) + l
    if (altKey && ctrlKey && key === 'l') {
      window.electronAPI.openDevTools((event, value) => {
        e.preventDefault();
      })
    }
  },
  false
);


