import React, { useState } from "react"
import themes from "./SquirrelTheme.json"
import SquirrelPreview from "../SquirrelPreview"
import useSquirrelStore, { SquirrelColors, SquirrelLayouts } from "../SquirrelStore"
import SquirrelCheckBox from "./SquirrelCheckBox"

type CheckProps = {
  onChange: (dark: boolean, checked: boolean) => void
  themeName: string
  checkedDarkName: string
  checkedLightName: string
}

const SquirrelUseThemeCheckbox = ({ onChange, themeName, checkedDarkName, checkedLightName }: CheckProps) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div
        style={{
          margin: "6px 0",
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "6px",
        }}
      >
        基于此修改
        <div style={{ border: "1px dashed gray", padding: "2px 4px" }}>
          <SquirrelCheckBox
            name={"dark"}
            checked={checkedDarkName === themeName}
            onChange={function (_: string, checked: boolean): void {
              onChange(true, checked)
            }}
          />
          <SquirrelCheckBox
            name={"light"}
            checked={checkedLightName === themeName}
            onChange={function (_: string, checked: boolean): void {
              onChange(false, checked)
            }}
          />
        </div>
        配色
      </div>
    </div>
  )
}

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

  const updateSquirrelTheme = useSquirrelStore().updateSquirrelTheme
  const [checkedLightName, changeLightName] = useState("曬經・日／Solarized Light")
  const [checkedDarkName, changeDarkName] = useState("曬經・月／Solarized Dark")
  return (
    <div
      style={{
        zIndex: 10,
        position: "fixed",
        justifyContent: "start",
        left: 0,
        top: 0,
        width: "40vw",
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
        console.log(`theme.text_color === 4278190335`, theme.text_color === 4278190335)

        return (
          <div
            style={{
              display: "flex",
              alignItems: "start",
              flexDirection: "column",
              border: "2px dashed gray",
              padding: "16px",
              margin: "16px",
            }}
          >
            <div style={{ margin: "16px", border: "4px solid black", display: "inline-flex", padding: "2px 6px" }}>
              {theme.name}
            </div>

            <div
              style={{ display: "inline-flex", alignItems: "center", width: "100%", justifyContent: "space-between" }}
            >
              <SquirrelPreview widthDelta={0} heightDelta={0} {...defaultStyle} {...theme} name={theme.name} />

              <SquirrelUseThemeCheckbox
                onChange={(dark, checked) => {
                  if (checked) {
                    updateSquirrelTheme(dark, theme)
                    if (dark) {
                      changeDarkName(theme.name)
                    } else {
                      changeLightName(theme.name)
                    }
                  }
                }}
                themeName={theme.name}
                checkedDarkName={checkedDarkName}
                checkedLightName={checkedLightName}
              />
            </div>
          </div>
        )
      })}

      <div style={{ padding: "16px", marginBottom: "32px" }}>
        配色方案:[Mac浅色],[Mac深色],[Mac绿色],[Mac橙色],[Mac浅蓝],[米兰],[纯洁],[北方浅色],[北方深色] 来自
        <a href="https://ssnhd.com/2022/01/11/rime-skin/">Rime Squirrel 鼠须管输入法皮肤效果</a>
      </div>
    </div>
  )
}

export default SquirrelModelSelect
