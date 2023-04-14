import { useState } from "react"
import { HexColorInput } from "react-colorful"
import PlumpColorPicker from "../../components/MyHexColorPicker"
import RevealOnFocus from "../../components/RevealOnFocus"

interface PickerWithInputProps {
  name: string
  color: string
  onColorChanged: (newcolor: string, name: string) => void
}

export default function ColorPickerWithInput({ name, color, onColorChanged }: PickerWithInputProps) {
  const [focus, changeFocus] = useState(false)

  return (
    <div
      title={name}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "12px",
      }}
      onFocusCapture={() => {
        changeFocus(true)
      }}
      onBlurCapture={() => {
        changeFocus(false)
      }}
    >
      <RevealOnFocus focus={focus} color={color} name={name.replace("_color", "")}>
        <PlumpColorPicker
          style={{
            width: "80px",
            height: "80px",
          }}
          color={color}
          onChange={(newcolor) => {
            onColorChanged(newcolor, name)
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
        color={color}
        onChange={(newcolor) => {
          onColorChanged(newcolor, name)
        }}
        prefixed
      />
    </div>
  )
}
