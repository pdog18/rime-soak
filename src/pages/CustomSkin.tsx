import { Select, Switch } from "antd"
import { useEffect, useState } from "react"
import { parse } from "yaml"

import { convertColor } from "../utils/ColorUtils"
import useCustomSkinState, { CustomSkinConfig, createCustomSkinState } from "../store/CustomSkinStore"

type ColorSchemeEntry = {
  label: string
  value: string
  data: Partial<CustomSkinConfig>
}

const CustomSkin = () => {
  const { colors, inline_preedit, items, pereditContent, changeSelectedTheme } = useCustomSkinState()
  const { pereditText, pereditHilitedText, pereditCaret } = pereditContent

  const convertedColors = Object.fromEntries(colors.map(([key, value]) => [key, convertColor(value)]))

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

  const colorDivs = colors.map(([key, value]) => {
    if (typeof value === "number") {
      const cssColor = convertColor(value)
      return (
        <div style={{ width: "120px" }} key={key}>
          <div
            style={{
              border: "1px solid black",
              backgroundColor: cssColor,
              width: "80px",
              height: "80px",
            }}
          ></div>
          <p style={{ backgroundColor: "white", margin: "4px 0px" }}>
            {key}: {cssColor}
          </p>
        </div>
      )
    }
    return null
  })

  const [skins, setSkins] = useState<ColorSchemeEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [isInlinePreedit, changeInlinePreedit] = useState(inline_preedit)

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

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <div
        style={{
          marginTop: `${isInlinePreedit ? 94 : 60}px`,
          display: "flex",
          flexDirection: "column",
          border: `3px solid ${border_color}`,
          backgroundColor: back_color,
        }}
      >
        {!isInlinePreedit && (
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
            padding: `${isInlinePreedit ? 7 : 6}px 7px 7px 7px`,
          }}
        >
          {items.map(({ label, suffix, candidate, comment }, index) => {
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
                    {`${label}${suffix}`}
                  </div>
                  <div style={{ width: "5px" }}></div>
                  <div
                    style={{ color: hilited ? hilited_candidate_text_color : candidate_text_color, fontSize: "20px" }}
                  >
                    {candidate}
                  </div>
                  <div style={{ color: hilited ? hilited_comment_text_color : comment_text_color, fontSize: "20px" }}>
                    {comment}
                  </div>
                  <div style={{ width: "7px" }}></div>
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
            查看方案
            <Select
              defaultValue="ikun"
              style={{ width: 120, marginLeft: "6px" }}
              loading={loading}
              options={skins}
              onChange={(_, option) => {
                const data = (option as ColorSchemeEntry).data as CustomSkinConfig
                changeSelectedTheme(data)
              }}
            />
          </div>

          <div>
            <Switch
              defaultChecked={isInlinePreedit}
              onChange={(checked: boolean) => {
                changeInlinePreedit(checked)
              }}
            />
            内嵌编辑区
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            columnGap: "80px",
            margin: "10vh 8vw",
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
