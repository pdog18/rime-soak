import { Candidate } from "../../store/CustomSkinStore"
// import "./preview.css"

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
  hilite_padding: number

  items: Candidate[]
  preeditContent: {
    [k: string]: string
  }
  convertedColors: {
    [k: string]: string
  }
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
  hilite_padding,
  items,
  preeditContent,
  convertedColors,
}: SkinProps) {
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

  const convertedFontSize = `${calculateRem(fontSize)}rem`

  return (
    <div
      style={{
        marginTop: `${inlinePreedit ? 55 : 20}px`,
        padding: `${margin_y}px ${margin_x}px`,
        backgroundColor: back_color,
        minWidth: `${min_width}px`,
        minHeight: `${min_height}px`,
        position: "relative",
        display: " inline-flex",
        flexDirection: "column",
        // padding: "10px",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      }}
    >
      <div
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
              style={{
                color: `${text_color}`,
                paddingRight: `${preeditText.length === 0 ? 0 : 2}px`,
              }}
            >
              {preeditText}
            </div>
            <div
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
              style={{
                color: `${text_color}`,
                padding: "0 2px",
              }}
            >
              {preeditCaret}
            </div>
          </div>
        )}

        {!inlinePreedit && <div style={{ backgroundColor: "transparent", height: `${spacing}px` }} />}
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
                  backgroundColor: hilited ? hilited_candidate_back_color : "transparent",
                  borderRadius: `${round_corner}px`,
                  fontSize: convertedFontSize,
                  display: "flex",
                  textAlign: "center",
                  justifyContent: "start",
                  alignItems: "center",
                }}
              >
                <div style={{ width: "3px" }} />
                <div style={{ color: hilited ? hilited_label_color : label_color }}>{label}</div>
                <div style={{ color: hilited ? hilited_label_color : label_color }}>{suffix}</div>
                <div style={{ width: `${hilite_padding}px` }} />
                <div
                  style={{
                    color: hilited ? hilited_candidate_text_color : candidate_text_color,
                  }}
                >
                  {candidate}
                </div>
                <div style={{ color: hilited ? hilited_comment_text_color : comment_text_color }}>{comment}</div>
                <div style={{ width: "7px" }} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
