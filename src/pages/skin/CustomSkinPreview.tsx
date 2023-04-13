import { Candidate } from "../../store/CustomSkinStore"

interface SkinProps {
  inlinePreedit: boolean
  horizontal: boolean
  pageSize: number
  items: Candidate[]
  pereditContent: {
    [k: string]: string
  }
  convertedColors: {
    [k: string]: string
  }
}

export default function CustomSkinPreview({
  inlinePreedit,
  horizontal,
  pageSize,
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

  return (
    <div
      style={{
        marginTop: `${inlinePreedit ? 55 : 20}px`,
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
                <div style={{ color: hilited ? hilited_candidate_text_color : candidate_text_color, fontSize: "20px" }}>
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
  )
}
