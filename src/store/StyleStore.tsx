import { create } from "zustand"
import produce from "immer"

const rimeName = () => {
  const userAgent = navigator.userAgent

  if (userAgent.indexOf("Win") !== -1) {
    return "weasel.custom.yaml"
  } else if (userAgent.indexOf("Mac") !== -1) {
    return "squirrel.custom.yaml"
  }

  return "?.custom.yaml"
}

interface AppOptions {
  [appName: string]: {
    ascii_mode: boolean
  }
}

interface StyleState {
  fileName: string
  styleCustom: {
    patch: {
      "style/horizontal": boolean
      "style/inline_preedit": boolean
      "style/display_tray_icon": boolean
      "style/color_scheme": string
      app_options: AppOptions
    }
  }
  changeColorScheme: (color_scheme: string) => void
  changeOrientation: (horizontal: boolean) => void
  changePreedit: (inline_preedit: boolean) => void
  changeDisplayTrayIcon: (display_tray_icon: boolean) => void
  changeAsciiModeApps: (appOptions: string[]) => void
}

const useStyleState = create<StyleState>()((set) => ({
  fileName: `${rimeName()}`,
  styleCustom: {
    patch: {
      "style/horizontal": false,
      "style/inline_preedit": false,
      "style/display_tray_icon": false,
      "style/color_scheme": "aqua",
      app_options: {
        "cmd.exe": {
          ascii_mode: true,
        },

        "conhost.exe": {
          ascii_mode: true,
        },
      },
    },
  },

  changeColorScheme: (color_scheme) =>
    set(
      produce((state) => {
        state.styleCustom.patch["style/color_scheme"] = color_scheme
      })
    ),

  changeOrientation: (horizontal) =>
    set(
      produce((state) => {
        state.styleCustom.patch["style/horizontal"] = horizontal
      })
    ),
  changePreedit: (inline_preedit) =>
    set(
      produce((state) => {
        state.styleCustom.patch["style/inline_preedit"] = inline_preedit
      })
    ),
  changeDisplayTrayIcon: (display_tray_icon) =>
    set(
      produce((state) => {
        state.styleCustom.patch["style/display_tray_icon"] = display_tray_icon
      })
    ),
  changeAsciiModeApps: (appOptions) =>
    set(
      produce((state) => {
        appOptions.forEach((tag: string) => {
          state.styleCustom.patch.app_options[tag] = {
            ascii_mode: true,
          }
        })
      })
    ),
}))

export type { StyleState }
export default useStyleState
