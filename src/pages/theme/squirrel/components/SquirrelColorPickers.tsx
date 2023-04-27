import { RgbaColor, RgbaColorPicker } from "react-colorful"
import { abgrToRgbaObject, rgbaObjectToAbgr } from "../ColorConverUtils"
import { SquirrelColors } from "../SquirrelStore"
import { useState } from "react"

type SquirrelColorPickersProps = SquirrelColors & {
  inline_preedit: boolean
  onChange: (name: string, color: number) => void
}

const convertColorName = (color: string) => {
  switch (color) {
    // 输入(预览)码
    case "text_color":
      return "预览文字"
    case "hilited_text_color":
      return "预览选中文字"
    case "hilited_back_color":
      return "预览选中背景"
    case "preedit_back_color":
      return "预览整体背景"
    // 面板背景&边框
    case "back_color":
      return "背景"
    case "border_color":
      return "边框"
    // 选中候选词
    case "hilited_candidate_label_color":
      return "选中候选词标签"
    case "hilited_candidate_text_color":
      return "选中候选词文字"
    case "hilited_comment_text_color":
      return "选中候选词备注"
    case "hilited_candidate_back_color":
      return "选中候选词背景"
    // 其他候选词
    case "label_color":
      return "普通标签"
    case "comment_text_color":
      return "普通备注"
    case "candidate_back_color":
      return "普通背景"
    case "candidate_text_color":
      return "普通文字"
    default:
      throw new Error("颜色不匹配")
  }
}

export default function SquirrelColorPickers(props: SquirrelColorPickersProps) {
  const { inline_preedit, onChange } = props

  const preeditColors = ["text_color", "hilited_text_color", "hilited_back_color", "preedit_back_color"]

  const convertedColors = Object.entries(props)
    .filter(([key, value]) => key.endsWith("_color") && typeof value === "number")
    // https://github.com/LEOYoon-Tsaw/Squirrel-Designer/issues/8#issuecomment-1525644979
    .filter(([key, value]) => !(key === "candidate_back_color"))
    .filter(([key, _]) => !(inline_preedit && preeditColors.includes(key)))
    .map(([key, value]) => [key, abgrToRgbaObject(value as number)] as [string, RgbaColor])

  // 防止 RgbaColorPicker 的 color 受到 SquirrelState 的影响
  // 从而导致颜色换算时因为透明度的问题导致的颜色错误
  const [colorMap] = useState(convertedColors)

  return (
    <div style={{ display: "flex", margin: "0 1vw", gap: "16px", flexWrap: "wrap" }}>
      {colorMap.map(([name, color]) => (
        <div key={name}>
          <div style={{ marginBottom: "6px" }}>{convertColorName(name)}</div>
          <RgbaColorPicker
            style={{ width: "180px", height: "180px" }}
            color={color}
            onChange={(color) => {
              onChange(name, rgbaObjectToAbgr(color))
            }}
          />
        </div>
      ))}
    </div>
  )
}
