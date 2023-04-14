import { Candidate } from "../../store/CustomSkinStore"

interface SkinProps {
  inlinePreedit: boolean
  horizontal: boolean
  pageSize: number
  fontSize: number
  min_width: number
  min_height: number
  items: Candidate[]
  pereditContent: {
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
  items,
  pereditContent,
  convertedColors,
}: SkinProps) {
  const { pereditText, pereditHilitedText, pereditCaret } = pereditContent
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
        minWidth: `${min_width}px`,
        minHeight: `${min_height}px`,
        display: "flex",
        height: "auto",
        flexDirection: "column",
        alignItems: "stretch",
        border: `3px solid ${border_color}`,
        backgroundColor: back_color,
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      }}
    >
      {!inlinePreedit && (
        <div
          style={{
            display: "inline-flex",
            paddingLeft: "7px",
            paddingTop: "7px",
          }}
        >
          <div
            style={{
              fontSize: convertedFontSize,
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                color: `${text_color}`,
                paddingRight: "2px",
              }}
            >
              {pereditText}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
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
          flexDirection: `${horizontal ? "row" : "column"}`,
          padding: `${inlinePreedit ? 7 : 6}px 7px 7px 7px`,
        }}
      >
        {items.slice(0, pageSize).map(({ label, suffix, candidate, comment }, index) => {
          const hilited = index === 0

          return (
            <div style={{ display: "flex" }} key={index}>
              <div
                style={{
                  fontSize: convertedFontSize,
                  display: "flex",
                  textAlign: "center",
                  justifyContent: "center",
                  backgroundColor: hilited ? hilited_candidate_back_color : back_color,
                  alignItems: "center",
                  boxSizing: "border-box",
                  borderRadius: "3px",
                }}
              >
                <div style={{ width: "3px" }} />
                <div style={{ color: hilited ? hilited_label_color : label_color }}>{label}</div>
                <div style={{ color: hilited ? hilited_label_color : label_color }}>{suffix}</div>
                <div style={{ width: "5px" }} />
                <div style={{ color: hilited ? hilited_candidate_text_color : candidate_text_color }}>{candidate}</div>
                <div style={{ color: hilited ? hilited_comment_text_color : comment_text_color }}>{comment}</div>
                <div style={{ width: "7px" }} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
