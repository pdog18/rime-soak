import React from "react"
import "./colorPicker.css"
import { HexColorPicker } from "react-colorful"

interface HexColorPickerProps {
  style: React.CSSProperties
  onChange: (color: string) => void
  color: string
}

const PlumpColorPicker: React.FC<HexColorPickerProps> = ({ style, color, onChange }) => {
  return (
    <div className="custom-layout">
      <HexColorPicker style={style} color={color} onChange={onChange} />
    </div>
  )
}

export default PlumpColorPicker
