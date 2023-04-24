import { create } from "zustand"
import { blendColors } from "../utils/ColorUtils"
import produce from "immer"

type Candidate = {
  label: string
  suffix: string
  candidate: string
  comment: string
}

interface CustomThemeState {
  skin: WeaselThemeConfig
  colors: [string, number][]
  items: Candidate[]
  changeSelectedTheme: (skin: WeaselThemeConfig) => void

  preeditContent: typeof preeditContent
}

const preeditContent = {
  preeditText: "输入法",
  preeditHilitedText: "shu ru fa",
  preeditCaret: "‸",
}

const items: Candidate[] = [
  { label: "1", suffix: ".", candidate: "输入法", comment: "(rime)" },
  { label: "2", suffix: ".", candidate: "输入", comment: "(type)" },
  { label: "3", suffix: ".", candidate: "书", comment: "" },
  { label: "4", suffix: ".", candidate: "数", comment: "" },
  { label: "5", suffix: ".", candidate: "树", comment: "" },
  { label: "6", suffix: ".", candidate: "属", comment: "" },
  { label: "7", suffix: ".", candidate: "输", comment: "" },
  { label: "8", suffix: ".", candidate: "熟", comment: "" },
  { label: "9", suffix: ".", candidate: "术", comment: "" },
  { label: "0", suffix: ".", candidate: "舒", comment: "" },
]

interface WeaselThemeConfig {
  author: string
  name: string

  back_color: number
  border_color: number

  label_color: number
  comment_text_color: number
  candidate_text_color: number

  hilited_label_color: number
  hilited_candidate_text_color: number
  hilited_candidate_back_color: number
  hilited_comment_text_color: number

  // 内选区域
  text_color: number
  hilited_text_color: number
  hilited_back_color: number
}

function createCustomWeaselState(
  style: Partial<WeaselThemeConfig> & {
    text_color: number
    back_color: number
  }
): WeaselThemeConfig {
  const {
    text_color,
    back_color,
    candidate_text_color = text_color,
    border_color = text_color,
    hilited_text_color = text_color,
    hilited_back_color = back_color,
    hilited_candidate_text_color = hilited_text_color,
    hilited_candidate_back_color = hilited_back_color,
    label_color = blendColors(candidate_text_color, back_color),
    comment_text_color = label_color,
    hilited_label_color = blendColors(hilited_candidate_text_color, hilited_candidate_back_color),
  } = style

  return {
    name: style.name ?? "rime-soak",
    author: style.author ?? "create by soak",
    text_color,
    back_color,
    border_color,

    label_color,
    hilited_text_color,
    hilited_back_color,

    candidate_text_color,
    comment_text_color,
    hilited_candidate_text_color,
    hilited_comment_text_color: style.hilited_comment_text_color ?? comment_text_color,
    hilited_candidate_back_color,
    hilited_label_color,
  }
}

const initTheme = createCustomWeaselState({
  text_color: 0x000000,
  back_color: 0xeceeee,
  border_color: 0xe0e0e0,

  hilited_text_color: 0x000000,
  hilited_back_color: 0xd4d4d4,
  hilited_candidate_text_color: 0xffffff,
  hilited_candidate_back_color: 0xfa3a0a,
})

const useCustomWeaselState = create<CustomThemeState>()((set, get) => ({
  skin: initTheme,
  items,
  preeditContent,
  colors: Object.entries(initTheme).filter(([_, value]) => typeof value === "number"),
  changeSelectedTheme(skin) {
    set(
      produce((state) => {
        state.skin = skin
        state.colors = Object.entries(skin).filter(([_, value]) => typeof value === "number")
      })
    )
  },
}))

export { createCustomWeaselState }
export type { WeaselThemeConfig, Candidate }
export default useCustomWeaselState
