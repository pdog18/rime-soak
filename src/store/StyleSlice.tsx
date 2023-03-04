import { createSlice } from "@reduxjs/toolkit"
import { writeYAML } from "./YAMLUtils"

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
}

let handle: FileSystemFileHandle

const rimeSlice = createSlice({
  name: "rime",
  initialState: rimeCustom,
  reducers: {
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
      writeYAML(state.style, handle)
    },

    initStyleCustomFromFile: (state, actions) => {
      const { hd, json } = actions.payload
      handle = hd
      state.style = json
      console.log("state.style", state.style)
    },
  },
})

export const {
  changeOrientation,
  changePreedit,
  changeDisplayTrayIcon,
  saveStyleSetting,
  initStyleCustomFromFile,
} = rimeSlice.actions
export default rimeSlice
