import React, { useState } from "react"

import * as yaml from "js-yaml"
import { blendColors } from "../../utils/ColorUtils"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const colors = [
  "back_color",
  "border_color",
  "preedit_back_color",
  "text_color",
  "hilited_text_color",
  "hilited_back_color",
  "candidate_text_color",
  "hilited_candidate_text_color",
  "hilited_candidate_back_color",
  "comment_text_color",
  "hilited_comment_text_color",
  "label_color",
  "label_hilited_color",
  "hilited_candidate_label_color",
]

function isSixDigitHexNumber(num: number) {
  const hexString = num.toString(16)
  return hexString.length === 6
}

function addAlphaIfNeeded(colorValue: number) {
  if (isSixDigitHexNumber(colorValue)) {
    return colorValue + 0xff000000
  }
  return colorValue
}

export default function ConvertYamlToJson() {
  const [content, setContent] = useState("")

  const handleChange = (e: { target: { value: React.SetStateAction<string> } }) => setContent(e.target.value)

  let output = ""
  try {
    const theme = yaml.load(content) as any

    const fillColorTheme = fillMissingColorsToRequired(theme)
    for (const key in fillColorTheme) {
      if (key.endsWith("_color")) {
        const value = fillColorTheme[key]
        if (value && value !== 0 /* 0x00000000*/) {
          fillColorTheme[key] = addAlphaIfNeeded(value)
        }
      }
    }

    output = `${JSON.stringify(fillColorTheme, null, 2)}`
  } catch (e) {
    output = `${e}`
  }

  const textAreaStyle = { flexGrow: 1 }

  return (
    <div>
      <div style={{ width: "100%", display: "inline-flex", height: "50vh" }}>
        <textarea value={content} onChange={handleChange} style={textAreaStyle} />
        <textarea value={output} onChange={handleChange} style={textAreaStyle} readOnly />
      </div>
      <div>{output}</div>
    </div>
  )
}

const fillMissingColorsToRequired = (theme: any) => {
  const TRANSPARENT = 0x00ffffff

  let {
    back_color,
    border_color,
    preedit_back_color,
    text_color,
    hilited_text_color,
    hilited_back_color,
    candidate_text_color,
    hilited_candidate_text_color,
    hilited_candidate_back_color,
    comment_text_color,
    hilited_comment_text_color,
    label_color,
    label_hilited_color,
    hilited_candidate_label_color,
  } = theme

  if (!text_color || !back_color) {
    throw new Error("(text_color || back_color) === undefined")
  }

  border_color = border_color ?? TRANSPARENT
  hilited_back_color = hilited_back_color ?? TRANSPARENT
  preedit_back_color = preedit_back_color ?? back_color

  hilited_text_color = hilited_text_color ?? text_color
  candidate_text_color = candidate_text_color ?? text_color
  hilited_candidate_text_color = hilited_candidate_text_color ?? hilited_text_color
  hilited_candidate_back_color = hilited_candidate_back_color ?? hilited_back_color

  comment_text_color = comment_text_color ?? TRANSPARENT
  hilited_comment_text_color = hilited_comment_text_color ?? comment_text_color
  label_color = label_color ?? blendColors(text_color, back_color)

  hilited_candidate_label_color =
    hilited_candidate_label_color ??
    label_hilited_color ??
    blendColors(hilited_candidate_text_color, hilited_candidate_back_color)

  return {
    ...theme,
    back_color,
    border_color,
    preedit_back_color,
    text_color,
    hilited_text_color,
    hilited_back_color,
    candidate_text_color,
    hilited_candidate_text_color,
    hilited_candidate_back_color,
    comment_text_color,
    hilited_comment_text_color,
    label_color,
    // label_hilited_color,
    hilited_candidate_label_color,
  }
}
