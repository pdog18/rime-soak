import React from "react"
import themes from "./SquirrelTheme.json"
import SquirrelPreview from "../SquirrelPreview"
import { SquirrelColors, SquirrelLayouts } from "../SquirrelStore"

const SquirrelModelSelect: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const defaultStyle = {
    border_height: 0,
    border_width: 0,
    comment_font_point: 18,
    corner_radius: 10,
    font_face: "Lucida Grande",
    font_point: 21,
    hilited_corner_radius: 0,
    inline_preedit: false,
    label_font_point: 18,
    line_spacing: 5,
    spacing: 10,
    text_orientation: "horizontal",
    base_offset: 0,
    candidate_list_layout: "linear",
    alpha: 1,
    color_space: "display_p3",
  } as SquirrelLayouts

  return (
    <div
      style={{
        zIndex: 10,
        position: "fixed",
        justifyContent: "start",
        left: 0,
        top: 0,
        width: "30vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: "2vh",
        backgroundColor: "#f3f3f3",
        border: "2px solid gray",
        overflowY: "auto",
      }}
      className="modal"
    >
      <button onClick={onClose} style={{ width: "80px", height: "60px", alignSelf: "end" }}>
        Close
      </button>
      {themes.map((theme: SquirrelColors & { name: string }) => {
        return (
          <div style={{ border: "2px dashed gray", padding: "16px", margin: "16px" }}>
            <div style={{ margin: "16px", border: "4px solid black", display: "inline-flex", padding: "2px 6px" }}>
              {theme.name}
            </div>

            <SquirrelPreview
              widthDelta={0}
              heightDelta={0}
              {...defaultStyle}
              {...theme}
              name={theme.name}
              text_color={0xff0000ff}
            />
          </div>
        )
      })}
    </div>
  )
}

export default SquirrelModelSelect
