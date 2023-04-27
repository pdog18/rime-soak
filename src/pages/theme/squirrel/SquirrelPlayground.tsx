import SquirrelPreview from "./SquirrelPreview"

import useSquirrelStore, { SquirrelStyleState } from "./SquirrelStore"
import SquirrelOutline from "./SquirrelOutline"
import SquirrelCheckBox from "./components/SquirrelCheckBox"
import SquirrelNumberInput from "./components/SquirrelNumberInput"
import SquirrelSelect from "./components/SquirrelSelect"
import { useState } from "react"
import SquirrelColorPickers from "./components/SquirrelColorPickers"
import { Tooltip, Typography } from "antd"

const { Link } = Typography

const SquirrelCustomTheme = () => {
  const state = useSquirrelStore<SquirrelStyleState>((state) => state)
  const preset_color_schemes = state.styleCustom.patch.preset_color_schemes
  const updateStyleLayout = state.updateStyleLayout
  const updateSquirrelColor = state.updateSquirrelColor
  const updateSelectTheme = state.updateSelectTheme
  const hintSelectThme = state.hintSelectThme

  const {
    corner_radius,
    border_width,
    border_height,
    spacing,
    label_font_point,
    font_point,
    comment_font_point,
    line_spacing,
    hilited_corner_radius,
    base_offset,
    alpha,
    inline_preedit,

    candidate_list_layout,
    text_orientation,
    color_space,
  } = preset_color_schemes.solarized_dark

  const [heightDelta, changeHeightDelta] = useState(0)
  const [widthDelta, changeWidthDelta] = useState(0)

  const borderConfigs = [
    { title: "面板圆角", name: "corner_radius", value: corner_radius, min: 0 },
    { title: "水平填充", name: "paddingWidth", value: corner_radius + widthDelta, min: 0 },
    { title: "垂直填充", name: "paddingHeight", value: corner_radius + heightDelta, min: 0 },
    { title: "边框宽度", name: "border_width", value: border_width - widthDelta, min: 0 },
    { title: "边框高度", name: "border_height", value: border_height - heightDelta, min: 0, disable: true },
  ]

  const fontSizeConfigs = [
    { title: "标签尺寸", name: "label_font_point", value: label_font_point, min: 1 },
    { title: "主要尺寸", name: "font_point", value: font_point, min: 6 },
    { title: "备注尺寸", name: "comment_font_point", value: comment_font_point, min: 2 },
  ]

  const [whichTheme, changeTheme] = useState("dark")

  return (
    <div style={{ display: "flex", justifyContent: "start" }}>
      <div
        style={{
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "start",
          gap: "2vh",
          margin: "0 32px",
          flexWrap: "wrap",
        }}
      >
        <SquirrelOutline title="使用主题">
          <Tooltip open={hintSelectThme} placement={"right"} title="选中使用的主题" color={"purple"} key={"purple"}>
            <SquirrelSelect
              flexDirection="column"
              name={"select:"}
              options={["none", "both", "light", "dark"]}
              value={state.selectTheme}
              onChange={updateSelectTheme}
            />
          </Tooltip>
        </SquirrelOutline>
        <SquirrelOutline title="排列方向">
          <SquirrelSelect
            name={"candidate_list_layout"}
            options={["stacked", "linear"]}
            value={candidate_list_layout}
            onChange={updateStyleLayout}
          />
          <SquirrelNumberInput
            title="词行间距"
            name={"line_spacing"}
            value={line_spacing}
            min={0}
            onChange={updateStyleLayout}
            disable={candidate_list_layout === "linear"}
          />
        </SquirrelOutline>
        <SquirrelOutline title="文字方向">
          <SquirrelSelect
            name={"text_orientation"}
            options={["horizontal", "vertical"]}
            disable={true}
            value={text_orientation}
            onChange={updateStyleLayout}
          />
        </SquirrelOutline>
        <SquirrelOutline title="色彩空间">
          <SquirrelSelect
            name={"color_space"}
            options={["display_p3", "srgb"]}
            value={color_space}
            onChange={updateStyleLayout}
          />
        </SquirrelOutline>

        <SquirrelOutline title="编码区">
          <div>
            <SquirrelCheckBox
              title="隐藏"
              name={"inline_preedit"}
              checked={inline_preedit}
              onChange={updateStyleLayout}
            />
            <SquirrelNumberInput
              title="词码间距"
              name={"spacing"}
              value={spacing}
              min={0}
              onChange={updateStyleLayout}
              disable={inline_preedit}
            />
          </div>
        </SquirrelOutline>

        <SquirrelNumberInput
          title="透明度"
          name={"alpha"}
          value={alpha}
          min={0}
          max={1}
          step={0.01}
          onChange={updateStyleLayout}
        />
      </div>

      <div
        style={{
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "start",
          justifyContent: "start",
          gap: "2vh",
          flexWrap: "wrap",
        }}
      >
        <SquirrelOutline title="边框">
          {borderConfigs.map(({ title, name, value, min, disable }) => (
            <SquirrelNumberInput
              title={title}
              key={name}
              name={name}
              value={value}
              min={min}
              onChange={(name, value) => {
                switch (name) {
                  case "border_width":
                    updateStyleLayout("border_width", value - (border_width - widthDelta) + border_width)
                    updateStyleLayout("border_height", value - (border_width - widthDelta) + border_height)
                    break
                  case "paddingWidth":
                    changeWidthDelta(value - corner_radius) // newWidthDelta
                    updateStyleLayout("border_width", border_width + (value - widthDelta - corner_radius))
                    break
                  case "paddingHeight":
                    changeHeightDelta(value - corner_radius) // newHeightDelta
                    updateStyleLayout("border_height", border_height + (value - heightDelta - corner_radius))
                    break
                  default: // border_height & corner_radius
                    updateStyleLayout(name, value)
                    break
                }
              }}
              disable={disable}
            />
          ))}
        </SquirrelOutline>

        <SquirrelOutline title="字体">
          {fontSizeConfigs.map(({ title, name, value, min }) => (
            <SquirrelNumberInput
              title={title}
              key={name}
              name={name}
              value={value}
              min={min}
              onChange={updateStyleLayout}
            />
          ))}
        </SquirrelOutline>

        <SquirrelNumberInput
          title="高亮圆角"
          name={"hilited_corner_radius"}
          value={hilited_corner_radius}
          min={0}
          onChange={updateStyleLayout}
        />

        <SquirrelNumberInput title="文字基线" name={"base_offset"} value={base_offset} onChange={updateStyleLayout} />
      </div>

      <div
        style={{
          display: "flex",
          flexGrow: "1",
          flexDirection: candidate_list_layout === "linear" ? "column" : "row",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
          rowGap: "6vw",
          columnGap: "6vh",
          width: "40vw",
        }}
      >
        <SquirrelPreview
          widthDelta={widthDelta}
          heightDelta={heightDelta}
          name={"solarized_light"}
          {...state.styleCustom.patch.preset_color_schemes.solarized_light}
        />
        <SquirrelPreview
          widthDelta={widthDelta}
          heightDelta={heightDelta}
          name={"solarized_dark"}
          {...state.styleCustom.patch.preset_color_schemes.solarized_dark}
        />
      </div>

      <SquirrelOutline
        style={{ width: "44vw", marginRight: "16px" }}
        title={
          <div
            style={{
              margin: "6px 0",
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "6px",
            }}
          >
            修改
            <SquirrelSelect
              name={"change_theme"}
              options={["dark", "light"]}
              value={whichTheme}
              onChange={(_, value) => changeTheme(value)}
            />
            配色
          </div>
        }
      >
        <SquirrelColorPickers
          {...(whichTheme === "dark"
            ? state.styleCustom.patch.preset_color_schemes.solarized_dark
            : state.styleCustom.patch.preset_color_schemes.solarized_light)}
          onChange={(name, color) => {
            updateSquirrelColor(whichTheme === "dark", name, color)
          }}
          inline_preedit={inline_preedit}
        />
      </SquirrelOutline>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "inline-flex",
          fontSize: "20px",
        }}
      >
        <div>部分效果(如文字方向)未实现。</div>
        <div>
          想要更准确的效果?
          <Link
            style={{
              fontSize: "20px",
            }}
            href="https://github.com/LEOYoon-Tsaw/Squirrel-Designer"
            target="_blank"
          >
            「LEOYoon-Tsaw/Squirrel-Designer」
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SquirrelCustomTheme
