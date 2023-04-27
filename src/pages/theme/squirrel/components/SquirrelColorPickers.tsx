import { RgbaColor, RgbaColorPicker } from "react-colorful"
import { abgrToRgbaObject, rgbaObjectToAbgr } from "../ColorConverUtils"
import { SquirrelColors } from "../SquirrelStore"

type SquirrelColorPickersProps = SquirrelColors & {
  inline_preedit: boolean
  onChange: (name: string, color: number) => void
}

export default function SquirrelColorPickers(props: SquirrelColorPickersProps) {
  const { inline_preedit, onChange } = props

  const preeditColors = ["text_color", "hilited_text_color", "hilited_back_color", "preedit_back_color"]
  console.log(inline_preedit)

  const convertedColors = Object.entries(props)
    .filter(([key, value]) => key.endsWith("_color") && typeof value === "number")
    .filter(([key, _]) => !(inline_preedit && preeditColors.includes(key)))
    .map(([key, value]) => [key, abgrToRgbaObject(value as number)] as [string, RgbaColor])

  return (
    <div style={{ display: "flex", margin: "0", gap: "16px", flexWrap: "wrap" }}>
      {convertedColors.map(([name, color]) => (
        <div>
          <div>{name.toString()}</div>
          <RgbaColorPicker color={color} onChange={(color) => onChange(name, rgbaObjectToAbgr(color))} />
        </div>
      ))}
    </div>
  )
}
