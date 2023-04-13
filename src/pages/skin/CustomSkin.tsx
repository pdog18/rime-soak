import { Select, Switch } from "antd"
import { useEffect, useState } from "react"
import { parse } from "yaml"

import { convertColor } from "../../utils/ColorUtils"
import useCustomSkinState, { CustomSkinConfig, createCustomSkinState } from "../../store/CustomSkinStore"
import IntegerStep from "../../components/IntegerStep"

import useStyleState from "../../store/StyleStore"
import useDefaultState from "../../store/DefaultStore"
import { RadioChoice } from "../../components/RimeSettingItem"
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
    changePreedit: changeInlinePreedit,
    changeOrientation,
    changeColorScheme,
    changeFontSize,
    styleCustom: { patch: stylePatch },
  } = useStyleState((state) => state)

  const pageSize = defaultPatch["menu/page_size"]
  const inline_preedit = stylePatch["style/inline_preedit"]
  const horizontal = stylePatch["style/horizontal"]
  const fontSize = stylePatch["style/font_point"]

  const { skin, colors, items, pereditContent, changeSelectedTheme } = useCustomSkinState()

  const [skins, setSkins] = useState<ColorSchemeEntry[]>([])
  const [focus, setFocus] = useState(false)
  const [loading, setLoading] = useState(true)

  const convertedColors = Object.fromEntries(colors.map(([key, value]) => [key, convertColor(value)]))

  function changeColor(newcolor: string, colorName: string) {
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
        console.log("from network")

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
      console.log(schemesArray[0].config)

      setLoading(false)
    }
    fetchSkins()
  }, [])

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
              setFocus(false)
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
            onChange={changeFontSize}
          />
        </div>

        <RadioChoice
          values={[true, false]}
          defaultValue={horizontal}
          names={["横屏", "竖屏"]}
          onChange={changeOrientation}
        />

        <RadioChoice
          values={[true, false]}
          defaultValue={inline_preedit}
          names={["编码行内嵌", "面板"]}
          onChange={changeInlinePreedit}
        />

        <div style={{ display: "inline-flex", alignItems: "center" }}>
          候选词数量
          <div style={{ width: "8px" }} />
          <IntegerStep slierWidth="8vw" showSlider={false} size={pageSize} onChange={changePageSize} />
        </div>
      </div>
      <CustomSkinPreview
        inlinePreedit={inline_preedit}
        horizontal={horizontal}
        pageSize={pageSize}
        fontSize={fontSize}
        pereditContent={pereditContent}
        items={items}
        convertedColors={convertedColors}
      />

      <ColorPickers
        inline_preedit={inline_preedit}
        colors={colors}
        changeColor={changeColor}
        focus={focus}
        changeFocus={setFocus}
      />
    </div>
  )
}

export default CustomSkin
