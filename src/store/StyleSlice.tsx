import { createSlice } from "@reduxjs/toolkit"
import { createNewYAML } from "./YAMLUtils"

const rimeCustom = {
  style: {
    customization: {
      distribution_code_name: "Weasel",
      distribution_version: "0.14.3_dev_0.8",
      generator: "Rime::SwitcherSettings",
      modified_time: "Mon Jan 30 22:32:13 2023",
      rime_version: "1.7.3",
    },
    patch: {
      "style/horizontal": false,
      "style/inline_preedit": false,
      "style/display_tray_icon": false,

      preset_color_schemes: {},
    },
  },
  basic_setting_changed: false,
  file_name: "weasel.custom.yaml",
}

let handle: FileSystemDirectoryHandle

const rimeSlice = createSlice({
  name: "style",
  initialState: rimeCustom,
  reducers: {
    initStyleCustomFileName: (state, actions) => {
      state.file_name = actions.payload
    },

    changeOrientation: (state, actions) => {
      state.style.patch["style/horizontal"] = actions.payload
      state.basic_setting_changed = true
    },
    changePreedit: (state, actions) => {
      state.style.patch["style/inline_preedit"] = actions.payload
      state.basic_setting_changed = true
    },
    changeDisplayTrayIcon: (state, actions) => {
      state.style.patch["style/display_tray_icon"] = actions.payload
      state.basic_setting_changed = true
    },
    saveStyleSetting: (state) => {
      createNewYAML(state.style, state.file_name, handle)
    },

    initStyleCustomFromFile: (state, actions) => {
      const { hd, json } = actions.payload
      handle = hd
      const styleCustomYAMLExist = !!json
      if (styleCustomYAMLExist) {
        state.style = json
      }
    },
  },
})

export const {
  initStyleCustomFileName,
  changeOrientation,
  changePreedit,
  changeDisplayTrayIcon,
  saveStyleSetting,
  initStyleCustomFromFile,
} = rimeSlice.actions
export default rimeSlice
