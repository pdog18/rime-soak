import { createSlice } from "@reduxjs/toolkit"
import copy from "../utils/SimpleDeepCopy"

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
      "style/color_scheme": "aqua",

      preset_color_schemes: {},
    },
  },

  basic_setting_changed: false,
  fileName: "weasel.custom.yaml",
}

const rimeSlice = createSlice({
  name: "style",
  initialState: rimeCustom,
  reducers: {
    changeColorScheme: (state, actions) => {
      state.style.patch["style/color_scheme"] = actions.payload
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
      state.style.customization.modified_time = new Date().toLocaleString()
    },

    initStyleFromDropDictory: (state, actions) => {
      state.style = actions.payload
    },

    initStyleCustomFileName: (state, actions) => {
      state.fileName = actions.payload
    },
  },
})

export const {
  initStyleCustomFileName,
  changeColorScheme,
  changeOrientation,
  changePreedit,
  changeDisplayTrayIcon,
  saveStyleSetting,
  initStyleFromDropDictory,
} = rimeSlice.actions
export default rimeSlice
