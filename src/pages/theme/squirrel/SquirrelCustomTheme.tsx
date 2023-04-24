import { useState } from "react"

import SquirrelPreview, { Colors } from "./SquirrelPreview"
import colors from "./squirrel.json"
import { useTextInput } from "../../../hooks/useTextInput"
import CustomSelect from "../../../components/CustomSelect"
import { useCheckBox } from "../../../hooks/useCheckBox"
import { useNumberInput } from "../../../hooks/useNumberInput"
import { useSelectInput } from "../../../hooks/useSelectInput"

const SquirrelCustomTheme = () => {
  const themes = Object.entries(colors.preset_color_schemes)
  const [selectTheme, changeSelectTheme] = useState(["solarized_light", "solarized_dark"])

  const name = useTextInput("")

  const textOrientation = useSelectInput(["horizontal", "vertical"])
  const candidate_list_layout = useSelectInput(["stacked", "linear"])
  const colorSpace = useSelectInput(["display_p3", "srgb"])

  const inlinePreedit = useCheckBox(true)
  const cornerRadius = useNumberInput(10)
  const hilited_corner_radius = useNumberInput(0)
  const borderWidth = useNumberInput(0)
  const borderHeight = useNumberInput(0)
  const preeditLineSpacing = useNumberInput(10)
  const comment_font_point = useNumberInput(18)
  const font_point = useNumberInput(21)
  const label_font_point = useNumberInput(18)
  const lineSpacing = useNumberInput(5)
  const baselineOffset = useNumberInput(0)
  const windowAplha = useNumberInput(100)

  const previewProps = {
    candidate_list_layout: candidate_list_layout.value,
    colorSpace: colorSpace.value,
    cornerRadius: cornerRadius.value,
    hilited_corner_radius: hilited_corner_radius.value,
    borderWidth: borderWidth.value,
    borderHeight: borderHeight.value,
    inlinePreedit: inlinePreedit.checked,
    preeditLineSpacing: preeditLineSpacing.value,
    text_orientation: textOrientation.value,
    comment_font_point: comment_font_point.value,
    font_point: font_point.value,
    label_font_point: label_font_point.value,
    lineSpacing: lineSpacing.value,
    baselineOffset: baselineOffset.value,
    windowAplha: windowAplha.value / 100,
    name: name.value,
  }

  return (
    <div>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          margin: "0 12vw",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "inline-flex", alignItems: "center" }}>
          候选布局
          <CustomSelect {...candidate_list_layout} />
        </div>
        <div style={{ display: "inline-flex", alignItems: "center" }}>
          文字方向
          <CustomSelect {...textOrientation} disable={true} />
        </div>
        <div style={{ display: "inline-flex", alignItems: "center" }}>
          色彩空间
          <CustomSelect {...colorSpace} />
        </div>

        <div style={{ display: "inline-flex", outline: "1px dashed black", outlineOffset: "6px" }}>
          <div>
            inline_preedit
            <input {...inlinePreedit} />
          </div>
          <div>
            spacing
            <input {...preeditLineSpacing} style={{ width: "3em" }} min={0} disabled={inlinePreedit.checked} />
          </div>
        </div>

        <div style={{ display: "inline-flex", outline: "1px dashed black", outlineOffset: "6px" }}>
          <div>
            border_radius
            <input {...cornerRadius} style={{ width: "3em" }} min={0} />
          </div>

          <div>
            border_width
            <input {...borderWidth} style={{ width: "3em" }} min={0} />
          </div>

          <div>
            border_height
            <input {...borderWidth} style={{ width: "3em" }} disabled={true} />
          </div>
        </div>

        <div style={{ display: "inline-flex", outline: "1px dashed black", outlineOffset: "6px" }}>
          <div>
            label_font_point
            <input {...label_font_point} style={{ width: "3em" }} min={1} />
          </div>
          <div>
            font_point
            <input {...font_point} style={{ width: "3em" }} min={6} />
          </div>

          <div>
            comment_font_point
            <input {...comment_font_point} style={{ width: "3em" }} min={1} />
          </div>
        </div>

        <div>
          line_spacing
          <input {...lineSpacing} style={{ width: "3em" }} min={0} />
        </div>

        <div>
          hilited_corner_radius
          <input {...hilited_corner_radius} style={{ width: "3em" }} min={0} />
        </div>

        <div>
          baseline_offset
          <input {...baselineOffset} style={{ width: "3em" }} />
        </div>
        <div>
          window_aplha
          <input {...windowAplha} style={{ width: "3em" }} min={0} max={100} />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: candidate_list_layout.value === "linear" ? "column" : "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "8vh",
          paddingTop: "4vh",
        }}
      >
        <select
          style={{
            position: "absolute",
            left: "12vw",
          }}
          multiple={true}
          defaultValue={selectTheme}
          size={themes.length}
          onChange={(e) => {
            const options = Array.from(e.target.selectedOptions)
            if (options.length > 4) {
              return
            }
            changeSelectTheme(options.map((op) => op.value))
          }}
        >
          {themes.map(([key]) => (
            <option key={key}>{key}</option>
          ))}
        </select>

        {Object.entries(colors.preset_color_schemes)
          // .reverse()
          .filter(([scheme]) => selectTheme.includes(scheme))
          .map(([key, value]) => (
            <div key={key}>
              <div> {key}</div>
              <SquirrelPreview darkMode={key.endsWith("_dark")} colors={value as Colors} {...previewProps} />
            </div>
          ))}
      </div>

      <div style={{ width: "100%", textAlign: "center", marginTop: "4vh" }}>
        <input {...name} placeholder="theme name" />
      </div>
    </div>
  )
}

export default SquirrelCustomTheme
