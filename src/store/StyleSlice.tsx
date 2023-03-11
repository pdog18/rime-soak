import { createSlice } from "@reduxjs/toolkit"

const rimeName = () => {
  const userAgent = navigator.userAgent

  let rime = "?"

  if (userAgent.indexOf("Win") !== -1) {
    rime = "weasel"
  } else if (userAgent.indexOf("Mac") !== -1) {
    rime = "squirrel"
  }

  return `${rime}.custom.yaml`
}

const initState = {
  styleCustom: {
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
    },
  },

  fileName: `${rimeName()}`,
}

const rimeSlice = createSlice({
  name: "style",
  initialState: initState,
  reducers: {
    changeColorScheme: (state, actions) => {
      state.styleCustom.patch["style/color_scheme"] = actions.payload
    },
    changeOrientation: (state, actions) => {
      state.styleCustom.patch["style/horizontal"] = actions.payload
    },
    changePreedit: (state, actions) => {
      state.styleCustom.patch["style/inline_preedit"] = actions.payload
    },
    changeDisplayTrayIcon: (state, actions) => {
      state.styleCustom.patch["style/display_tray_icon"] = actions.payload
    },
  },
})

export const { changeColorScheme, changeOrientation, changePreedit, changeDisplayTrayIcon } = rimeSlice.actions
export default rimeSlice
