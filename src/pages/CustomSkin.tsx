import { create } from "zustand"

const convertColor = (color: number | string) => {
  if (typeof color === "number") {
    const r = (color >> 16) & 0xff // 提取红色分量
    const g = (color >> 8) & 0xff // 提取绿色分量
    const b = color & 0xff // 提取蓝色分量
    const bgrNumber = (b << 16) | (g << 8) | r

    console.log("#" + bgrNumber.toString(16).padStart(6, "0"))

    return "#" + bgrNumber.toString(16).padStart(6, "0")
  } else {
    const hexValue = color.replace("#", "").toLowerCase()
    return parseInt(hexValue, 16)
  }
}

type Candidate = {
  label: string
  candidate: string
  comment: string
}

const items: Candidate[] = [
  { label: "1", candidate: "鼠须管", comment: "(shu)" },
  { label: "2", candidate: "舒徐", comment: "" },
  { label: "3", candidate: "书", comment: "" },
  { label: "4", candidate: "数", comment: "" },
  { label: "5", candidate: "树", comment: "(shu)" },
  { label: "6", candidate: "属", comment: "" },
  { label: "7", candidate: "输", comment: "" },
  { label: "8", candidate: "熟", comment: "" },
  { label: "9", candidate: "术", comment: "" },
  { label: "0", candidate: "舒", comment: "" },
]

interface ParentProps {
  children: React.ReactNode
}
const Center: React.FC<ParentProps> = ({ children }) => {
  const parentStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh", // 设置高度以确保子元素在垂直方向上居中
  }

  return <div style={parentStyle}>{children}</div>
}

interface CustomSkinState {
  author: string
  name: string
  text_color: number
  back_color: number
  border_color: number
  label_color: number

  hilited_text_color: number
  hilited_back_color: number
  // hilited_label_color: number

  candidate_text_color: number
  comment_text_color: number
  hilited_candidate_text_color: number
  hilited_comment_text_color: number
  hilited_candidate_back_color: number
  hilited_candidate_label_color: number
}

const skype: CustomSkinState = {
  name: "斯蓋普／Skype",
  author: "Patricivs <ipatrickmac@me.com>",
  text_color: 0xffffff,
  back_color: 0xefad00,
  border_color: 0xefad00,
  label_color: 0xffffff,
  hilited_text_color: 0xefad00,
  hilited_back_color: 0xffffff,
  // hilited_label_color: 0xefad00,
  candidate_text_color: 0xffffff,
  comment_text_color: 0xffffff,
  hilited_candidate_text_color: 0xefad00,
  hilited_comment_text_color: 0xefad00,
  hilited_candidate_back_color: 0xffffff,
  hilited_candidate_label_color: 0xefad00,
}

const useCustomSkinState = create<CustomSkinState>()((set, get) => skype)

const CustomSkin = () => {
  const skinState = useCustomSkinState()

  const border_color = `${convertColor(skinState.border_color)}`
  const text_color = `${convertColor(skinState.text_color)}`

  const hilited_back_color = `${convertColor(skinState.hilited_back_color)}`
  const hilited_text_color = `${convertColor(skinState.hilited_text_color)}`

  const back_color = `${convertColor(skinState.back_color)}`
  const label_color = `${convertColor(skinState.label_color)}`
  const candidate_text_color = `${convertColor(skinState.candidate_text_color)}`
  const comment_text_color = `${convertColor(skinState.comment_text_color)}`

  const hilited_candidate_label_color = `${convertColor(skinState.hilited_candidate_label_color)}`
  const hilited_candidate_text_color = `${convertColor(skinState.hilited_candidate_text_color)}`
  const hilited_candidate_back_color = `${convertColor(skinState.hilited_candidate_back_color)}`
  const hilited_comment_text_color = `${convertColor(skinState.hilited_comment_text_color)}`
  const colorDivs = Object.entries(skinState).map(([key, value]) => {
    if (typeof value === "number") {
      const cssColor = convertColor(value) as string
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
  return (
    <Center>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "80px",
          margin: "120px   240px",
          justifyContent: "center",
        }}
      >
        {colorDivs}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          border: `3px solid ${border_color}`,
          backgroundColor: back_color,
        }}
      >
        <div
          style={{
            display: "inline-flex",

            paddingLeft: "7px",
            paddingTop: "9px",
          }}
        >
          <div
            style={{
              display: "flex",
              height: "34px",
              textAlign: "center",
              justifyContent: "center",
              padding: "0px 2px",
              alignItems: "center",
              boxSizing: "border-box",
              color: hilited_text_color,
              backgroundColor: hilited_back_color,
              lineHeight: "1",
              borderRadius: "2px",
            }}
          >
            shu xu guan
          </div>
        </div>
        <div
          style={{
            display: "inline-flex",
            padding: "7px",
          }}
        >
          {items.map(({ label, candidate, comment }, index) => {
            const hilited = index === 0

            return (
              <div style={{ display: "flex" }} key={index}>
                <div
                  style={{
                    display: "flex",
                    height: "34px",
                    textAlign: "center",
                    justifyContent: "center",
                    backgroundColor: hilited ? hilited_candidate_back_color : back_color,
                    alignItems: "center",
                    boxSizing: "border-box",
                    lineHeight: "1",
                    borderRadius: "2px",
                  }}
                >
                  <div style={{ width: "2px" }}></div>
                  <div
                    style={{
                      color: hilited ? hilited_candidate_label_color : label_color,
                      fontSize: "20px",
                    }}
                  >
                    {label === undefined ? index + 1 : label}.
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
                  <div style={{ width: "3px" }}></div>
                </div>
                <div style={{ width: "5px" }}></div>
              </div>
            )
          })}
        </div>
      </div>
    </Center>
  )
}

export default CustomSkin
