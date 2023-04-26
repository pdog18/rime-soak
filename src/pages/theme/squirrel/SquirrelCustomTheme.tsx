import SquirrelPreview from "./SquirrelPreview"

import useSquirrelStore, { SquirrelStyleState } from "./SquirrelStore"
import SquirrelOutline from "./SquirrelOutline"
import SquirrelCheckBox from "./components/SquirrelCheckBox"
import SquirrelNumberInput from "./components/SquirrelNumberInput"
import SquirrelSelect from "./components/SquirrelSelect"

const SquirrelCustomTheme = () => {
  const state = useSquirrelStore<SquirrelStyleState>((state) => state)
  const preset_color_schemes = state.styleCustom.patch.preset_color_schemes
  const updateStyleLayout = state.updateStyleLayout
  const updateSelectTheme = state.updateSelectTheme

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

  const borderConfigs = [
    { name: "corner_radius", value: corner_radius, min: 0 },
    { name: "border_width", value: border_width, min: 0 },
    { name: "borderHeight", value: border_height, min: 0, disable: true },
  ]

  const fontSizeConfigs = [
    { name: "label_font_point", value: label_font_point, min: 1 },
    { name: "font_point", value: font_point, min: 6 },
    { name: "comment_font_point", value: comment_font_point, min: 2 },
  ]

  console.log("state.selectTheme", state.selectTheme)

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
        <SquirrelSelect
          name={"selectTheme"}
          options={["none", "both", "light", "dark"]}
          value={state.selectTheme}
          onChange={updateSelectTheme}
        />

        <SquirrelSelect
          name={"candidate_list_layout"}
          options={["stacked", "linear"]}
          value={candidate_list_layout}
          onChange={updateStyleLayout}
        />

        <SquirrelSelect
          name={"text_orientation"}
          options={["horizontal", "vertical"]}
          disable={true}
          value={text_orientation}
          onChange={updateStyleLayout}
        />

        <SquirrelSelect
          name={"color_space"}
          options={["display_p3", "srgb"]}
          value={color_space}
          onChange={updateStyleLayout}
        />

        <SquirrelOutline>
          <SquirrelCheckBox name={"inline_preedit"} checked={inline_preedit} onChange={updateStyleLayout} />
          <SquirrelNumberInput
            name={"spacing"}
            value={spacing}
            min={0}
            onChange={updateStyleLayout}
            disable={inline_preedit}
          />
        </SquirrelOutline>

        <SquirrelOutline>
          {borderConfigs.map(({ name, value, min, disable }) => (
            <SquirrelNumberInput
              key={name}
              name={name}
              value={value}
              min={min}
              onChange={updateStyleLayout}
              disable={disable}
            />
          ))}
        </SquirrelOutline>

        <SquirrelOutline>
          {fontSizeConfigs.map(({ name, value, min }) => (
            <SquirrelNumberInput key={name} name={name} value={value} min={min} onChange={updateStyleLayout} />
          ))}
        </SquirrelOutline>

        <SquirrelNumberInput name={"line_spacing"} value={line_spacing} min={0} onChange={updateStyleLayout} />

        <SquirrelNumberInput
          name={"hilited_corner_radius"}
          value={hilited_corner_radius}
          min={0}
          onChange={updateStyleLayout}
        />

        <SquirrelNumberInput name={"base_offset"} value={base_offset} onChange={updateStyleLayout} />
        <SquirrelNumberInput name={"alpha"} value={alpha} min={0} max={1} step={0.01} onChange={updateStyleLayout} />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: candidate_list_layout === "linear" ? "column" : "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "8vh",
          paddingTop: "4vh",
        }}
      >
        <SquirrelPreview name={"solarized_light"} {...state.styleCustom.patch.preset_color_schemes.solarized_light} />
        <SquirrelPreview name={"solarized_dark"} {...state.styleCustom.patch.preset_color_schemes.solarized_dark} />
      </div>
    </div>
  )
}

export default SquirrelCustomTheme
