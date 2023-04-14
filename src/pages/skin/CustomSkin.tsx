import { Select } from "antd"
import { useEffect, useState } from "react"
import { parse } from "yaml"

import { convertColor } from "../../utils/ColorUtils"
import useCustomSkinState, { CustomSkinConfig, createCustomSkinState } from "../../store/CustomSkinStore"
import IntegerStep from "../../components/IntegerStep"

import useStyleState from "../../store/StyleStore"
import useDefaultState from "../../store/DefaultStore"
import { RadioChoice } from "../../components/RimeSettingItem"
import NumericInput from "../../components/NumericInput"
import CustomSkinPreview from "./CustomSkinPreview"
import ColorPickers from "./ColorPickers"

type ColorSchemeEntry = {
  label: string
  value: string
  config: Partial<CustomSkinConfig>
}

const CustomSkin = () => {
  const {
    changePageSize,
    defaultCustom: { patch: defaultPatch },
  } = useDefaultState((state) => state)

  const {
    changeColorScheme,
    updateStyleCustom,
    styleCustom: { patch: stylePatch },
  } = useStyleState((state) => state)

  const pageSize = defaultPatch["menu/page_size"]
  const inline_preedit = stylePatch["style/inline_preedit"]
  const horizontal = stylePatch["style/horizontal"]
  const fontSize = stylePatch["style/font_point"]
  const min_width = stylePatch["style/layout/min_width"]
  const min_height = stylePatch["style/layout/min_height"]
  const border_width = stylePatch["style/layout/border_width"]
  const margin_x = stylePatch["style/layout/margin_x"]
  const margin_y = stylePatch["style/layout/margin_y"]
  const spacing = stylePatch["style/layout/spacing"]
  const candidate_spacing = stylePatch["style/layout/candidate_spacing"]
  const hilite_padding = stylePatch["style/layout/hilite_padding"]
  const round_corner = stylePatch["style/layout/round_corner"]

  const { skin, colors, items, preeditContent, changeSelectedTheme } = useCustomSkinState()
  const [skins, setSkins] = useState<ColorSchemeEntry[]>([])
  const [loading, setLoading] = useState(true)
  const convertedColors = Object.fromEntries(colors.map(([key, value]) => [key, convertColor(value)]))

  function onColorChanged(newcolor: string, colorName: string) {
    const config = { ...skin, [colorName]: convertColor(newcolor) }
    changeSelectedTheme(config)
    changeColorScheme("soak", config)
  }

  useEffect(() => {
    async function fetchSkins() {
      const url = `https://raw.githubusercontent.com/rime/weasel/master/output/data/weasel.yaml`
      const dictData = await (await fetch(url)).text()

      const schemes = parse(dictData).preset_color_schemes
      const schemesArray = Object.entries(schemes).map((entry) => {
        return {
          label: entry[0],
          value: entry[0],
          config: createCustomSkinState(
            entry[1] as Partial<CustomSkinConfig> & {
              text_color: number
              back_color: number
            }
          ),
        }
      })

      setSkins(schemesArray)
      changeSelectedTheme(schemesArray[0].config)
      setLoading(false)
    }
    fetchSkins()
  }, [changeSelectedTheme])

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifySelf: "center",
        width: "80vw",
        margin: "0vh 10vw",
        height: "auto",
      }}
    >
      <div style={{ display: "inline-flex", columnGap: "80px", alignItems: "center" }}>
        <div>
          查看方案
          <Select
            defaultValue="ikun"
            style={{ width: 120, marginLeft: "6px" }}
            loading={loading}
            options={skins}
            onChange={(value, option) => {
              const config = (option as ColorSchemeEntry).config as CustomSkinConfig
              changeSelectedTheme(config)
              changeColorScheme(value, config)
            }}
          />
        </div>

        <div>
          字体大小
          <Select
            defaultValue={fontSize}
            style={{ width: 60, marginLeft: "6px" }}
            loading={loading}
            options={Array.from({ length: 15 }, (_, index) => 10 + index * 2).map((size) => ({
              label: size.toString(),
              value: size,
            }))}
            onChange={(value) => updateStyleCustom("style/font_point", value)}
          />
        </div>

        <RadioChoice
          values={[true, false]}
          defaultValue={horizontal}
          names={["横屏", "竖屏"]}
          onChange={(value) => updateStyleCustom("style/horizontal", value)}
        />

        <RadioChoice
          values={[true, false]}
          defaultValue={inline_preedit}
          names={["编码行内嵌", "面板"]}
          onChange={(value) => updateStyleCustom("style/inline_preedit", value)}
        />

        <div style={{ display: "inline-flex", alignItems: "center" }}>
          候选词数量
          <div style={{ width: "8px" }} />
          <IntegerStep slierWidth="8vw" showSlider={false} size={pageSize} onChange={changePageSize} />
        </div>
      </div>
      <div style={{ display: "inline-flex", columnGap: "80px", alignItems: "center" }}>
        <div>
          最小宽度
          <NumericInput
            style={{ width: "60px", marginLeft: "6px" }}
            value={min_width}
            maxLength={4}
            onChange={(number) => updateStyleCustom("style/layout/min_width", number)}
            defaultValue={min_width}
          />
        </div>

        <div>
          最小宽度
          <NumericInput
            style={{ width: "60px", marginLeft: "6px" }}
            value={min_height}
            maxLength={4}
            onChange={(number) => updateStyleCustom("style/layout/min_height", number)}
            defaultValue={min_height}
          />
        </div>

        <div>
          边框宽度
          <NumericInput
            style={{ width: "60px", marginLeft: "6px" }}
            value={border_width}
            maxLength={2}
            onChange={(number) => updateStyleCustom("style/layout/border_width", number)}
            defaultValue={border_width}
          />
        </div>
        <div>
          水平边距
          <NumericInput
            style={{ width: "60px", marginLeft: "6px" }}
            value={margin_x}
            maxLength={2}
            onChange={(number) => updateStyleCustom("style/layout/margin_x", number)}
            defaultValue={margin_x}
          />
        </div>
        <div>
          垂直边距
          <NumericInput
            style={{ width: "60px", marginLeft: "6px" }}
            value={margin_y}
            maxLength={2}
            onChange={(number) => updateStyleCustom("style/layout/margin_y", number)}
            defaultValue={margin_y}
          />
        </div>
      </div>
      <div style={{ display: "inline-flex", columnGap: "80px", alignItems: "center" }}>
        <div>
          间距
          <NumericInput
            style={{ width: "60px", marginLeft: "6px" }}
            disabled={inline_preedit}
            value={spacing}
            maxLength={2}
            onChange={(number) => updateStyleCustom("style/layout/spacing", number)}
            defaultValue={spacing}
          />
        </div>

        <div>
          候选词间距
          <NumericInput
            style={{ width: "60px", marginLeft: "6px" }}
            value={candidate_spacing}
            maxLength={2}
            onChange={(number) => updateStyleCustom("style/layout/candidate_spacing", number)}
            defaultValue={candidate_spacing}
          />
        </div>
        <div>
          高亮圆角
          <NumericInput
            style={{ width: "60px", marginLeft: "6px" }}
            value={round_corner}
            maxLength={2}
            onChange={(number) => updateStyleCustom("style/layout/round_corner", number)}
            defaultValue={round_corner}
          />
        </div>
        <div>
          hilite_padding
          <NumericInput
            style={{ width: "60px", marginLeft: "6px" }}
            value={hilite_padding}
            maxLength={2}
            onChange={(number) => updateStyleCustom("style/layout/hilite_padding", number)}
            defaultValue={hilite_padding}
          />
        </div>
      </div>
      <CustomSkinPreview
        hilite_padding={hilite_padding}
        inlinePreedit={inline_preedit}
        candidate_spacing={candidate_spacing}
        horizontal={horizontal}
        round_corner={round_corner}
        spacing={spacing}
        fontSize={fontSize}
        min_width={min_width}
        min_height={min_height}
        pageSize={pageSize}
        border_width={border_width}
        margin_x={margin_x}
        margin_y={margin_y}
        items={items}
        preeditContent={preeditContent}
        convertedColors={convertedColors}
      />
      {/* <input type="text" style={{ alignSelf: "start", marginLeft: "30vw" }} /> */}

      <ColorPickers
        filterColors={colors
          .filter(([key, _]) => {
            if (!inline_preedit) {
              return true
            }
            const excludedKeys = ["text_color", "hilited_back_color", "hilited_text_color"]
            return !excludedKeys.includes(key)
          })
          .map(([key, value]) => [key, convertColor(value)])}
        onColorChanged={onColorChanged}
      />
    </div>
  )
}

export default CustomSkin
