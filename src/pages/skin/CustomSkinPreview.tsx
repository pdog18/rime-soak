import { useContext, useState } from "react"
import { Candidate } from "../../store/CustomSkinStore"
import CustomSkinContext from "./CustomSkinContext"
import "./animation.css"

interface SkinProps {
  inlinePreedit: boolean
  horizontal: boolean
  pageSize: number
  fontSize: number
  min_width: number
  min_height: number
  border_width: number
  margin_x: number
  margin_y: number
  spacing: number
  candidate_spacing: number
  round_corner: number
  hilite_spacing: number
  hilite_padding: number

  items: Candidate[]
  preeditContent: {
    [k: string]: string
  }
  convertedColors: {
    [k: string]: string
  }
  notifyTargetArea: boolean
}

const calculateRem = (size: number) => {
  const baseFontSize = 16 // 默认字体大小，通常为16px
  const pixels = (size * 96) / 72 // 将点数转换为像素
  return pixels / baseFontSize
}

export default function CustomSkinPreview({
  inlinePreedit,
  horizontal,
  pageSize,
  fontSize,
  min_width,
  min_height,
  border_width,
  margin_x,
  margin_y,
  spacing,
  candidate_spacing,
  round_corner,
  hilite_spacing,
  hilite_padding,
  items,
  preeditContent,
  convertedColors,
  notifyTargetArea,
}: SkinProps) {
  const convertedFontSize = `${calculateRem(fontSize)}rem`
  const { preeditText, preeditHilitedText, preeditCaret } = preeditContent

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

  const { animationColorName: animName } = useContext(CustomSkinContext)

  const getAnimClassName = (animationColorName: string, expectedColorName: string) => {
    if (!notifyTargetArea) {
      return ""
    }

    if (animationColorName !== expectedColorName) {
      return ""
    }

    if (expectedColorName.includes("border")) {
      return "animatedBorder"
    }

    if (expectedColorName.includes("back")) {
      return "animatedBackground"
    }

    return "animatedText"
  }

  const animation_back_color = getAnimClassName(animName, "back_color")
  const animation_hilited_back_color = getAnimClassName(animName, "hilited_back_color")
  const animation_hilited_candidate_back_color = getAnimClassName(animName, "hilited_candidate_back_color")
  const animation_text_color = getAnimClassName(animName, "text_color")
  const animation_border_color = getAnimClassName(animName, "border_color")
  const animation_label_color = getAnimClassName(animName, "label_color")
  const animation_hilited_label_color = getAnimClassName(animName, "hilited_label_color")
  const animation_hilited_text_color = getAnimClassName(animName, "hilited_text_color")
  const animation_candidate_text_color = getAnimClassName(animName, "candidate_text_color")
  const animation_comment_text_color = getAnimClassName(animName, "comment_text_color")
  const animation_hilited_candidate_text_color = getAnimClassName(animName, "hilited_candidate_text_color")
  const animation_hilited_comment_text_color = getAnimClassName(animName, "hilited_comment_text_color")

  return (
    <div
      className={animation_back_color}
      style={{
        marginTop: `4vh`,
        padding: `${margin_y}px ${margin_x}px`,
        backgroundColor: back_color,
        minWidth: `${min_width}px`,
        minHeight: `${min_height}px`,
        position: "relative",
        display: " inline-flex",
        flexDirection: "column",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      }}
    >
      <div
        className={animation_border_color}
        style={{
          position: "absolute",
          zIndex: 1,
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          border: `${border_width}px solid ${border_color}`,
          boxSizing: "border-box",
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "inline-flex",
          height: "auto",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        {!inlinePreedit && (
          <div>
            <div
              style={{
                display: "inline-flex",
                fontSize: convertedFontSize,
                textAlign: "center",
                justifyContent: "start",
                alignItems: "center",
              }}
            >
              <div
                className={animation_text_color}
                style={{
                  color: `${text_color}`,
                  paddingRight: `${preeditText.length === 0 ? 0 : 2}px`,
                }}
              >
                {preeditText}
              </div>
              <div
                className={animation_hilited_back_color + animation_hilited_text_color}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "0 3px",
                  borderRadius: `${round_corner}px`,
                  color: `${hilited_text_color}`,
                  backgroundColor: `${hilited_back_color}`,
                }}
              >
                {preeditHilitedText}
              </div>
              <div
                className={animation_text_color}
                style={{
                  color: `${text_color}`,
                  padding: "0 2px",
                }}
              >
                {preeditCaret}
              </div>
            </div>
            <div style={{ backgroundColor: "transparent", height: `${spacing}px` }} />
          </div>
        )}

        <div
          style={{
            display: "inline-flex",
            flexDirection: `${horizontal ? "row" : "column"}`,
            gap: `${candidate_spacing}px`,
          }}
        >
          {items.slice(0, pageSize).map(({ label, suffix, candidate, comment }, index) => {
            const hilited = index === 0
            return (
              <div
                key={index}
                style={{
                  alignSelf: "stretch",
                  backgroundColor: "transparent",
                  fontSize: convertedFontSize,
                  display: "flex",
                  textAlign: "center",
                  justifyContent: "start",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                {hilited && (
                  <div
                    className={animation_hilited_candidate_back_color}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: hilited_candidate_back_color,
                      borderRadius: `${round_corner}px`,
                      padding: `${hilite_padding}px`,
                      zIndex: -1,
                    }}
                  />
                )}

                <div style={{ width: "3px" }} />
                <div
                  className={hilited ? animation_hilited_label_color : animation_label_color}
                  style={{
                    color: hilited ? hilited_label_color : label_color,
                  }}
                >
                  {label}
                </div>
                <div
                  className={hilited ? animation_hilited_label_color : animation_label_color}
                  style={{ color: hilited ? hilited_label_color : label_color }}
                >
                  {suffix}
                </div>
                <div style={{ width: `${hilite_spacing}px` }} />
                <div
                  className={hilited ? animation_hilited_candidate_text_color : animation_candidate_text_color}
                  style={{
                    color: hilited ? hilited_candidate_text_color : candidate_text_color,
                  }}
                >
                  {candidate}
                </div>
                <div
                  className={hilited ? animation_hilited_comment_text_color : animation_comment_text_color}
                  style={{ color: hilited ? hilited_comment_text_color : comment_text_color }}
                >
                  {comment}
                </div>
                <div style={{ width: "7px" }} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
