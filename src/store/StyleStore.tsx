import { create } from "zustand"
import produce from "immer"
import { stringify } from "yaml"
import { CustomSkinConfig } from "./CustomSkinStore"

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

interface StylePatch {
  "style/horizontal": boolean
  "style/inline_preedit": boolean
  "style/display_tray_icon": boolean
  "style/color_scheme": string
  "style/font_point": number
  "style/layout/min_width": number
  "style/layout/min_height": number
  preset_color_schemes: {
    [key: string]: CustomSkinConfig
  }
  app_options: AppOptions
}

interface StyleState {
  fileName: string
  styleCustom: {
    patch: StylePatch
  }
  changeColorScheme: (color_scheme: string, config: CustomSkinConfig) => void
  changeOrientation: (horizontal: boolean) => void
  changePreedit: (inline_preedit: boolean) => void
  changeDisplayTrayIcon: (display_tray_icon: boolean) => void
  changeFontSize: (fontSize: number) => void
  changeMinWidth: (min_width: number) => void
  changeMinHeight: (min_height: number) => void

  changeAsciiModeApps: (appOptions: string[]) => void
  generateYAML: () => string | null
}

function appOtionsOK(app_options: AppOptions | undefined) {
  if (!app_options) {
    return false
  }
  if (Object.keys(app_options).length !== 2) {
    return false
  }
  return app_options["cmd.exe"].ascii_mode && app_options["conhost.exe"].ascii_mode
}

const useStyleState = create<StyleState>()((set, get) => ({
  fileName: `${rimeName()}`,
  styleCustom: {
    patch: {
      "style/horizontal": false,
      "style/inline_preedit": false,
      "style/display_tray_icon": false,
      "style/color_scheme": "aqua",
      "style/font_point": 14,
      "style/layout/min_width": 160,
      "style/layout/min_height": 0,

      preset_color_schemes: {},
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

  generateYAML: () => {
    const patch: Partial<StylePatch> = { ...get().styleCustom.patch }

    if (!patch["style/horizontal"]) {
      delete patch["style/horizontal"]
    }
    if (!patch["style/inline_preedit"]) {
      delete patch["style/inline_preedit"]
    }
    if (!patch["style/display_tray_icon"]) {
      delete patch["style/display_tray_icon"]
    }

    const color_scheme_name = patch["style/color_scheme"]
    if (color_scheme_name === "aqua") {
      delete patch["style/color_scheme"]
      delete patch.preset_color_schemes
    } else if (patch.preset_color_schemes && color_scheme_name) {
      patch.preset_color_schemes = {
        [color_scheme_name]: patch.preset_color_schemes[color_scheme_name],
      }
    }

    if (appOtionsOK(patch.app_options)) {
      delete patch.app_options
    }

    if (Object.keys(patch).length === 0) {
      return null
    }

    return stringify({ patch: patch })
  },

  changeColorScheme: (color_scheme_name, color_scheme) =>
    set(
      produce((state) => {
        state.styleCustom.patch["style/color_scheme"] = color_scheme_name
        state.styleCustom.patch.preset_color_schemes[color_scheme_name] = color_scheme
      })
    ),

  changeFontSize: (fontSize) =>
    set(
      produce((state) => {
        state.styleCustom.patch["style/font_point"] = fontSize
      })
    ),

  changeMinWidth: (min_width) =>
    set(
      produce((state) => {
        state.styleCustom.patch["style/layout/min_width"] = min_width
      })
    ),

  changeMinHeight: (min_height) =>
    set(
      produce((state) => {
        state.styleCustom.patch["style/layout/min_height"] = min_height
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
