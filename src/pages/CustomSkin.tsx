import { Select, Switch } from "antd"
import { useEffect, useState } from "react"
import { parse } from "yaml"

import { convertColor } from "../utils/ColorUtils"
import useCustomSkinState, { CustomSkinConfig, createCustomSkinState } from "../store/CustomSkinStore"
import IntegerStep from "../components/IntegerStep"

import { HexColorInput } from "react-colorful"

import RevealOnFocus from "../components/RevealOnFocus"
import PlumpColorPicker from "../components/MyHexColorPicker"

type ColorSchemeEntry = {
  label: string
  value: string
  data: Partial<CustomSkinConfig>
}

const CustomSkin = () => {
  const { skin, colors, items, pereditContent, changeSelectedTheme } = useCustomSkinState()
  const { pereditText, pereditHilitedText, pereditCaret } = pereditContent

  const [skins, setSkins] = useState<ColorSchemeEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [inline_preedit, changeInlinePreedit] = useState(true)
  const [pageSize, changePageSize] = useState(6)

  const [showBackground, changeShowBackground] = useState(true)

  const convertedColors = Object.fromEntries(colors.map(([key, value]) => [key, convertColor(value)]))

  const filterColors = colors
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

  const {
    back_color,
    border_color,
    text_color,
    hilited_back_color,
    hilited_text_color,
    label_color,
    candidate_text_color,
    comment_text_color,
    hilited_label_color,
    hilited_candidate_text_color,
    hilited_candidate_back_color,
    hilited_comment_text_color,
  } = convertedColors

  const [focus, setFocus] = useState(false)

  const colorDivs = filterColors.map(({ name, color }) => {
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
              changeSelectedTheme({ ...skin, [name]: convertColor(newcolor) })
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
          onFocusCapture={() => {
            setFocus(true)
          }}
          color={color}
          onChange={(newcolor) => {
            changeSelectedTheme({ ...skin, [name]: convertColor(newcolor) })
          }}
          placeholder="Type a color"
          prefixed
        />
      </div>
    )
  })

  useEffect(() => {
    async function fetchSkins() {
      const url = `https://raw.githubusercontent.com/rime/weasel/master/output/data/weasel.yaml`
      const dictData = await (await fetch(url)).text()

      const schemes = parse(dictData).preset_color_schemes
      const schemesArray = Object.entries(schemes).map((entry) => {
        return {
          label: entry[0],
          value: entry[0],
          data: createCustomSkinState(
            entry[1] as Partial<CustomSkinConfig> & {
              text_color: number
              back_color: number
            }
          ),
        }
      })

      setSkins(schemesArray)
      setLoading(false)
    }
    fetchSkins()
  }, [])

  const maskStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    zIndex: 0,
    backgroundImage:
      "linear-gradient(0deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)",
    backgroundSize: "20px 20px",
  }

  return (
    <div
      style={{
        ...(showBackground ? maskStyle : {}),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifySelf: "center",
        width: "80vw",
        margin: "0vh 10vw",
        height: "auto",
        // backgroundColor: "#3eb370",
      }}
    >
      <div
        style={{
          marginTop: `${inline_preedit ? 55 : 20}px`,
          display: "flex",
          height: "auto",
          flexDirection: "column",
          alignItems: "stretch",
          border: `3px solid ${border_color}`,
          backgroundColor: back_color,
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
      >
        {!inline_preedit && (
          <div
            style={{
              display: "inline-flex",
              paddingLeft: "7px",
              paddingTop: "7px",
            }}
          >
            <div
              style={{
                display: "flex",
                height: "29px",
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  color: `${text_color}`,
                  fontSize: "20px",
                  paddingRight: "2px",
                }}
              >
                {pereditText}
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: "20px",
                  alignItems: "center",
                  height: "29px",
                  padding: "0 3px",
                  borderRadius: "3px",
                  color: `${hilited_text_color}`,
                  backgroundColor: `${hilited_back_color}`,
                }}
              >
                {pereditHilitedText}
              </div>
              <div
                style={{
                  color: `${text_color}`,
                  fontSize: "20px",
                  padding: "2px",
                }}
              >
                {pereditCaret}
              </div>
            </div>
          </div>
        )}
        <div
          style={{
            display: "inline-flex",
            padding: `${inline_preedit ? 7 : 6}px 7px 7px 7px`,
          }}
        >
          {items.slice(0, pageSize).map(({ label, suffix, candidate, comment }, index) => {
            const hilited = index === 0

            return (
              <div style={{ display: "flex" }} key={index}>
                <div
                  style={{
                    display: "flex",
                    height: "29px",
                    textAlign: "center",
                    justifyContent: "center",
                    backgroundColor: hilited ? hilited_candidate_back_color : back_color,
                    alignItems: "center",
                    boxSizing: "border-box",
                    lineHeight: "1",
                    borderRadius: "3px",
                  }}
                >
                  <div style={{ width: "3px" }}></div>
                  <div
                    style={{
                      color: hilited ? hilited_label_color : label_color,
                      fontSize: "20px",
                    }}
                  >
                    {label}
                  </div>
                  <div
                    style={{
                      color: hilited ? hilited_label_color : label_color,
                      fontSize: "20px",
                    }}
                  >
                    {suffix}
                  </div>
                  <div style={{ width: "5px" }} />
                  <div
                    style={{ color: hilited ? hilited_candidate_text_color : candidate_text_color, fontSize: "20px" }}
                  >
                    {candidate}
                  </div>
                  <div style={{ color: hilited ? hilited_comment_text_color : comment_text_color, fontSize: "20px" }}>
                    {comment}
                  </div>
                  <div style={{ width: "7px" }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div
        style={{
          display: "inline-flex",
          flexDirection: "column",
          marginTop: "32px",
          alignItems: "center",
        }}
      >
        <div style={{ display: "inline-flex", columnGap: "80px", alignItems: "center" }}>
          <div>
            背景网格
            <Switch
              defaultChecked={true}
              onChange={(checked: boolean) => {
                changeShowBackground(checked)
              }}
            />
          </div>

          <div>
            查看方案
            <Select
              defaultValue="ikun"
              style={{ width: 120, marginLeft: "6px" }}
              loading={loading}
              options={skins}
              onChange={(_, option) => {
                const data = (option as ColorSchemeEntry).data as CustomSkinConfig
                changeSelectedTheme(data)
                setFocus(false)
              }}
            />
          </div>

          <div>
            内嵌编辑区
            <Switch
              defaultChecked={inline_preedit}
              onChange={(checked: boolean) => {
                changeInlinePreedit(checked)
              }}
            />
          </div>

          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <IntegerStep
              size={pageSize}
              onChange={(value: number) => {
                changePageSize(value)
              }}
            />
            候选词数量
          </div>
        </div>

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
      </div>
    </div>
  )
}

export default CustomSkin
