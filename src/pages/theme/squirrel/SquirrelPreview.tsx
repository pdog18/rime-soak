// (Rime AGRB[0xFFBBGGRR]) <<===>> (Web rgba[rgba(r,g,b,a)])
function convertColor(color: number): string {
  const a = ((color >> 24) & 0xff) / 0xff
  const b = (color >> 16) & 0xff
  const g = (color >> 8) & 0xff
  const r = color & 0xff
  return `rgba(${r},${g},${b},${a})`
}

type Colors = {
  back_color: number
  border_color: number
  preedit_back_color: number
  candidate_text_color: number
  label_color: number
  comment_text_color: number

  text_color: number
  hilited_text_color: number
  hilited_back_color: number

  hilited_candidate_back_color: number
  hilited_candidate_text_color: number
  hilited_candidate_label_color: number
  hilited_comment_text_color: number
}

type PreviewProps = {
  name: string
  darkMode: boolean
  candidate_list_layout: "linear" | "stacked"
  colorSpace: "display_p3" | "srgb"
  inlinePreedit: boolean
  preeditLineSpacing: number
  hilited_corner_radius: number

  text_orientation: "horizontal" | "vertical"
  colors: Colors

  borderWidth: number
  borderHeight: number
  cornerRadius: number
  baselineOffset: number
  windowAplha: number

  comment_font_point: number
  font_point: number
  label_font_point: number
  lineSpacing: number
}

// const words = ["rime", "鼠须管", "Rime", "小狼毫", "中州韵rime输入法框架"]
const words = [
  {
    label: "1.",
    word: "鼠须管",
    comment: "(squirrel)",
  },
  {
    label: "2.",
    word: "鼠",
    comment: "(shu)",
  },
  {
    label: "3.",
    word: "须",
  },
  {
    label: "4.",
    word: "管",
  },
  {
    label: "5.",
    word: "📚",
  },
]

const SquirrelPreview = ({
  inlinePreedit,
  colors,
  candidate_list_layout,
  borderWidth,
  hilited_corner_radius,
  // borderHeight,
  preeditLineSpacing,
  cornerRadius,
  lineSpacing: spacing,
  baselineOffset,
  windowAplha,

  comment_font_point,
  font_point,
  label_font_point,
}: PreviewProps) => {
  const convertedColors = Object.fromEntries(Object.entries(colors).map(([key, value]) => [key, convertColor(value)]))

  const {
    back_color,
    border_color,
    preedit_back_color,
    candidate_text_color,
    label_color,
    comment_text_color,

    text_color,
    hilited_text_color,
    // hilited_back_color,

    hilited_candidate_back_color,
    hilited_candidate_text_color,
    hilited_candidate_label_color,
    hilited_comment_text_color,
  } = convertedColors

  const horizontal = candidate_list_layout === "linear"

  const { preeditText, preeditHilitedText, preeditCaret } = {
    preeditText: "输入法",
    preeditHilitedText: "shu ru fa",
    preeditCaret: "‸",
  }

  // 表现错误的 `spacing` 属性, 可能是一个  bug  会被修复.
  const bugPadding = !inlinePreedit ? preeditLineSpacing / 2 : 0

  return (
    <div
      style={{
        boxSizing: "border-box",
        opacity: windowAplha,
        borderRadius: `${cornerRadius}px`,
        outline: `${borderWidth}px solid ${border_color}`,

        boxShadow: `0 ${borderWidth}px ${borderWidth}px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)`,

        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ borderRadius: `${cornerRadius}px`, overflow: "clip", backgroundColor: back_color }}>
        {!inlinePreedit && (
          <div
            style={{
              display: "inline-flex",
              width: "100%",
              padding: `${cornerRadius / 4}px ${cornerRadius}px ${bugPadding}px`,
              backgroundColor: preedit_back_color,
              fontSize: font_point,
            }}
          >
            <div style={{ color: text_color }}> {preeditText}</div>
            <div style={{ color: hilited_text_color }}>{preeditHilitedText}</div>
            <div style={{ color: text_color }}>{preeditCaret}</div>
          </div>
        )}

        <div
          style={{
            display: "flex",
            flexDirection: horizontal ? "row" : "column",
            justifyContent: "start",
            alignItems: "stretch",
            gap: spacing,
            maxWidth: "560px",
            flexWrap: "wrap",
            borderRadius: `${inlinePreedit ? cornerRadius : 0}px`,
            overflow: "clip",
          }}
        >
          {words.map((word, index) => {
            const first = index === 0
            const last = index === words.length - 1

            const paddingLeft = first || !horizontal ? cornerRadius : 0
            const paddingRight = last || !horizontal ? cornerRadius : 0

            // 一旦候选词有了圆角,那么就没有  paddingTop  了.
            const paddingTop =
              hilited_corner_radius !== 0
                ? cornerRadius
                : (first || horizontal) && !inlinePreedit
                ? bugPadding
                : cornerRadius
            const paddingBootom = last || horizontal ? cornerRadius : 0

            const offsetPaddingTop = baselineOffset < 0 ? paddingTop + Math.abs(baselineOffset) : paddingTop
            const offsetPaddingBottom = baselineOffset > 0 ? paddingBootom + Math.abs(baselineOffset) : paddingBootom

            const extraVerticalPadding = horizontal ? 0 : 6

            return (
              <div
                key={index}
                style={{
                  display: "inline-flex",
                  paddingLeft: `${paddingLeft}px`,
                  paddingRight: `${paddingRight}px`,
                  paddingTop: `${first ? offsetPaddingTop + extraVerticalPadding : offsetPaddingTop}px`,
                  paddingBottom: `${last ? offsetPaddingBottom + extraVerticalPadding : offsetPaddingBottom}px`,
                  backgroundColor: first ? hilited_candidate_back_color : back_color,
                  alignItems: "baseline",

                  borderRadius: `${hilited_corner_radius}px`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    color: first ? hilited_candidate_label_color : label_color,
                    paddingRight: `${label_font_point / 4}px`,
                    fontSize: label_font_point,
                  }}
                >
                  {index + 1}.
                </div>
                <div
                  style={{
                    color: first ? hilited_candidate_text_color : candidate_text_color,
                    fontSize: font_point,
                    display: "flex",
                    alignItems: "flex-end",
                    lineHeight: "1",
                  }}
                >
                  {word.word}
                </div>
                <div
                  style={{
                    color: first ? hilited_comment_text_color : comment_text_color,
                    fontSize: comment_font_point,
                    display: "flex",
                    alignItems: "flex-end",
                    lineHeight: "1",
                  }}
                >
                  {word.comment}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SquirrelPreview
export type { Colors }
