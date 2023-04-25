import { create } from "zustand"
import produce from "immer"
import * as yaml from "js-yaml"

type ThemeSelectType = "dark" | "light" | "both" | "none"
interface SquirrelDetails {
  name: string
  author: string
}

interface Patch {
  "style/color_scheme": "solarized_light" | "solarized_dark"
  "style/color_scheme_dark": "solarized_dark"
  preset_color_schemes: {
    // [key: string]: SquirrelColors & SquirrelLayouts & SquirrelDetails
    solarized_light: SquirrelColors & SquirrelLayouts & Partial<SquirrelDetails>
    solarized_dark: SquirrelColors & SquirrelLayouts & Partial<SquirrelDetails>
  }
}

interface SquirrelLayouts {
  inline_preedit: boolean
  spacing: number

  label_font_point: number
  font_point: number
  comment_font_point: number
  border_height: number
  border_width: number

  hilited_corner_radius: number
  corner_radius: number

  line_spacing: number
  base_offset: number
  alpha: number

  color_space: "display_p3" | "srgb"
  text_orientation: "horizontal" | "vertical"
  candidate_list_layout: "linear" | "stacked"
  font_face: string
  candidate_format: string
}

interface SquirrelColors {
  back_color: number
  border_color: number
  preedit_back_color: number
  candidate_text_color: number
  label_color: number
  comment_text_color: number
  text_color: number
  hilited_back_color: number
  hilited_candidate_back_color: number
  hilited_candidate_text_color: number
  hilited_candidate_label_color: number
  hilited_comment_text_color: number
  hilited_text_color: number
}

const initDetails: Partial<SquirrelDetails> = {
  author: "雪齋 <lyc20041@gmail.com>",
}

const initLayout: SquirrelLayouts = {
  border_height: 0,
  border_width: 0,

  comment_font_point: 18,
  corner_radius: 10,

  font_point: 21,
  hilited_corner_radius: 0,
  inline_preedit: true,
  label_font_point: 18,
  line_spacing: 5,
  spacing: 10,
  base_offset: 0,

  text_orientation: "horizontal",
  candidate_list_layout: "stacked",
  color_space: "display_p3",
  candidate_format: "%c %@",
  font_face: "Lucida Grande",
  alpha: 1.0,
}

interface SquirrelStyleConfig {}
interface SquirrelStyleState {
  selectTheme: ThemeSelectType
  styleCustom: {
    patch: Patch
  }
  changeColorScheme: (color_scheme: string, config: SquirrelStyleConfig) => void
  updateStyleLayout: (path: string, value: string | number | boolean) => void
  updateSquirrelColor: (isDark: boolean, colorname: string, value: number) => void
  updateSelectTheme: (name: string, value: string) => void
  generateYAML: () => string | null
}

const useSquirrelStore = create<SquirrelStyleState>()((set, get) => ({
  selectTheme: "none",
  styleCustom: {
    patch: {
      "style/color_scheme": "solarized_light",
      "style/color_scheme_dark": "solarized_dark",
      preset_color_schemes: {
        solarized_light: {
          ...initLayout,
          ...initDetails,
          name: "曬經・日／Solarized Light",
          back_color: 4041602811,
          border_color: 4293787647,
          preedit_back_color: 4282397974,
          candidate_text_color: 4284046848,
          label_color: 4288898055,
          comment_text_color: 4278212935,
          text_color: 4288782485,
          hilited_back_color: 4283187234,
          hilited_candidate_back_color: 4292339949,
          hilited_candidate_text_color: 4281942731,
          hilited_candidate_label_color: 4280641222,
          hilited_comment_text_color: 4286661826,
          hilited_text_color: 4281109422,
        },
        solarized_dark: {
          ...initLayout,
          ...initDetails,
          name: "曬經・月／Solarized Dark",
          back_color: 4030016010,
          border_color: 4280950528,
          preedit_back_color: 4292339949,
          candidate_text_color: 4285762047,
          label_color: 4282879476,
          comment_text_color: 4291005183,
          text_color: 4285886045,
          hilited_back_color: 4291418847,
          hilited_candidate_back_color: 4282397974,
          hilited_candidate_text_color: 4288192338,
          hilited_candidate_label_color: 4291594567,
          hilited_comment_text_color: 4280850825,
          hilited_text_color: 4290670701,
        },
      },
    },
  },

  changeColorScheme: (color_scheme_name, color_scheme) =>
    set(
      produce((state) => {
        state.styleCustom.patch["style/color_scheme"] = color_scheme_name
        state.styleCustom.patch.preset_color_schemes[color_scheme_name] = color_scheme
      })
    ),

  updateStyleLayout: (path, value) =>
    set(
      produce((state: SquirrelStyleState) => {
        console.log("path :", path, "value: ", value)
        ;(state.styleCustom.patch.preset_color_schemes.solarized_light as any)[path] = value
        ;(state.styleCustom.patch.preset_color_schemes.solarized_dark as any)[path] = value
      })
    ),

  updateSquirrelColor: (dark, colorname, value) =>
    set(
      produce((state: SquirrelStyleState) => {
        if (dark) {
          ;(state.styleCustom.patch.preset_color_schemes.solarized_dark as any)[colorname] = value
        } else {
          ;(state.styleCustom.patch.preset_color_schemes.solarized_light as any)[colorname] = value
        }
      })
    ),
  updateSelectTheme: (_, value) =>
    set(
      produce((state: SquirrelStyleState) => {
        console.log("update select thme : ", value)

        state.selectTheme = value as ThemeSelectType
      })
    ),

  generateYAML: () => {
    const state = get()
    const patch: Partial<Patch> = { ...state.styleCustom.patch }

    if (state.selectTheme === "none") {
      return null
    }
    if (state.selectTheme !== "both") {
      delete patch["style/color_scheme_dark"]
      if (state.selectTheme === "dark") {
        patch["style/color_scheme"] = "solarized_dark"
      }
    }

    return yaml.dump({ patch: patch }, { styles: { "!!int": "hexadecimal" } })
  },
}))

export type { SquirrelStyleState, SquirrelLayouts, SquirrelColors }

export default useSquirrelStore
