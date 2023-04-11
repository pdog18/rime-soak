import { create } from "zustand"
import { blendColors } from "../utils/ColorUtils"
import produce from "immer"

type Candidate = {
  label: string
  suffix: string
  candidate: string
  comment: string
}

interface CustomSkinState {
  skin: CustomSkinConfig
  colors: [string, number][]
  items: Candidate[]
  changeSelectedTheme: (skin: CustomSkinConfig) => void

  pereditContent: typeof pereditContent
}

const pereditContent = {
  pereditText: "输入法",
  pereditHilitedText: "shu ru fa",
  pereditCaret: "‸",
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

interface CustomSkinConfig {
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

function createCustomSkinState(
  style: Partial<CustomSkinConfig> & {
    text_color: number
    back_color: number
  }
): CustomSkinConfig {
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

const initSkin = createCustomSkinState({
  text_color: 0xffffff,
  back_color: 0x70b33e,
  border_color: 0x70b33e,

  hilited_back_color: 0xffffff,
  hilited_comment_text_color: 0x70b33e,
  hilited_text_color: 0x70b33e,
  label_color: 0xffffff,
})

const useCustomSkinState = create<CustomSkinState>()((set, get) => ({
  skin: initSkin,
  items,
  pereditContent,
  colors: Object.entries(initSkin).filter(([_, value]) => typeof value === "number"),
  changeSelectedTheme(skin) {
    set(
      produce((state) => {
        state.skin = skin
        state.colors = Object.entries(skin).filter(([_, value]) => typeof value === "number")
      })
    )
  },
}))

export { createCustomSkinState }
export type { CustomSkinConfig }
export default useCustomSkinState
