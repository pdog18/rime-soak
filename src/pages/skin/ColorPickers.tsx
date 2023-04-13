import { HexColorInput } from "react-colorful"
import PlumpColorPicker from "../../components/MyHexColorPicker"
import RevealOnFocus from "../../components/RevealOnFocus"

import { convertColor } from "../../utils/ColorUtils"

interface ColorPickersProps {
  inline_preedit: boolean
  colors: [string, number][]
  changeColor: (newcolor: string, name: string) => void
  focus: boolean
  changeFocus: (focus: boolean) => void
}

export default function ColorPickers({ inline_preedit, colors, changeColor, focus, changeFocus }: ColorPickersProps) {
  const handleClick = () => {
    changeFocus(true)
  }

  const colorDivs = colors
    .filter(([key, _]) => {
      if (!inline_preedit) {
        return true
      }
      const excludedKeys = ["text_color", "hilited_back_color", "hilited_text_color"]
      return !excludedKeys.includes(key)
    })
    .map(([key, value]) => {
      return { name: key, color: convertColor(value) }
    })
    .map(({ name, color }) => {
      return (
        <div
          title={name}
          key={name}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <RevealOnFocus focus={focus} color={color}>
            <PlumpColorPicker
              style={{
                width: "80px",
                height: "80px",
              }}
              color={color}
              onChange={(newcolor) => {
                changeColor(newcolor, name)
              }}
            />
          </RevealOnFocus>

          <HexColorInput
            style={{
              display: "block",
              boxSizing: "border-box",
              width: "90px",
              padding: "6px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              backgroundColor: `#9FBFD8`,
              outline: "none",
              font: "inherit",
              textTransform: "uppercase",
              textAlign: "center",
              textShadow: "1px 1px 1px rgba(0, 0, 0, 0.3)",
            }}
            onFocusCapture={handleClick}
            color={color}
            onChange={(newcolor) => {
              changeColor(newcolor, name)
            }}
            prefixed
          />
        </div>
      )
    })

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        columnGap: `${inline_preedit ? `2vw` : `6vw`}`,
        rowGap: "2vh",
        margin: "10vh 0vw",
        justifyContent: "center",
      }}
    >
      {colorDivs}
    </div>
  )
}
