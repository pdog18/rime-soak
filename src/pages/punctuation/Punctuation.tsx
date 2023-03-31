import { CSSProperties, useState } from "react"
import punctuation from "./punctuation.json"
import { Tag, Checkbox } from "antd"
import Tags from "./Tags"
import AddTag from "./AddTag"
import type { CheckboxChangeEvent } from "antd/es/checkbox"

const punctuationArray = Object.keys(punctuation.ascii_style).map((key, index) => {
  return {
    name: key,
    index: index,
    full_shape: (punctuation.full_shape as any)[key],
    half_shape: (punctuation.half_shape as any)[key],
    ascii_style: (punctuation.ascii_style as any)[key],
  }
})

const allAsciiStyleArray = Object.keys(punctuation.ascii_style).map((key, index) => {
  return {
    name: key,
    index: index,
    full_shape: (punctuation.ascii_style as any)[key],
    half_shape: (punctuation.ascii_style as any)[key],
    ascii_style: (punctuation.ascii_style as any)[key],
  }
})

const combine = (inputValue: string, shape: any) => {
  let result
  // 如果是空，那么 shape 变成 inputValue 追加
  if (Object.keys(shape).length === 0 || !shape) {
    console.log("shape 是空的 shape = ", shape, "  inputValue = ", inputValue)
    result = inputValue
  } else if (Array.isArray(shape)) {
    // 如果是 array 直接追加
    result = [...shape, inputValue]
  } else {
    // 把原来的值转成string，然后和 inputValue 一起加入到数组
    let origin = shape["commit"] ? shape["commit"] : shape["pair"] ? shape["pair"] : shape
    result = [origin, inputValue]
  }

  return result
}

const Punctuation: React.FC = () => {
  const [array, setPunctuation] = useState(punctuationArray)

  const styles: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "48px",
    gap: "16px",
  }

  return (
    <>
      <Checkbox
        style={styles}
        onChange={(e: CheckboxChangeEvent) => {
          setPunctuation(e.target.checked ? allAsciiStyleArray : punctuationArray)
        }}
      >
        全部使用英文符号
      </Checkbox>
      {array.map((shape) => {
        return (
          <div style={styles} key={shape.name}>
            <Tag style={{ width: "24px", textAlign: "center" }}>{shape.name}</Tag>
            <Tag style={{ width: "24px", textAlign: "center" }}>
              {shape.ascii_style["commit"] ? shape.ascii_style["commit"] : shape.name}
            </Tag>

            <div style={{ width: "400px" }}>
              <Tags
                shape={shape.half_shape}
                onDelete={(e: any) => {
                  console.log(e, "half_shape", "shape.key = ", shape.name)
                }}
              />
              <AddTag
                onPunctuationAdded={(inputValue: string) => {
                  const result = combine(inputValue, shape.half_shape)
                  console.log(inputValue, "result", result, "half_shape", "shape.key = ", shape.name)
                }}
              />
            </div>

            <div style={{ width: "400px" }}>
              <Tags
                shape={shape.full_shape}
                onDelete={(e: any) => {
                  console.log(e, "full_shape", "shape.key = ", shape.name)
                }}
              />
              <AddTag
                onPunctuationAdded={(inputValue: string) => {
                  const result = combine(inputValue, shape.full_shape)
                  console.log(inputValue, "result", result, "half_shape", "shape.key = ", shape.name)
                }}
              />
            </div>
          </div>
        )
      })}
    </>
  )
}

export default Punctuation
