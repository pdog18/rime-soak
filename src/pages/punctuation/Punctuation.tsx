import { CSSProperties } from "react"

import { Tag, Checkbox } from "antd"
import Tags from "./Tags"
import AddTag from "./AddTag"
import type { CheckboxChangeEvent } from "antd/es/checkbox"
import useSchemaState from "../../store/SchemaStore"

const insertNewValue = (inputValue: string, shape: any) => {
  if (shape === null || Object.keys(shape).length === 0) {
    return inputValue
  } else if (Array.isArray(shape)) {
    // 如果是 array 直接追加
    return [...shape, inputValue]
  } else {
    // 把原来的值转成string，然后和 inputValue 一起加入到数组
    let origin = shape["commit"] ? shape["commit"] : shape["pair"] ? shape["pair"] : shape
    return [origin, inputValue]
  }
}

const removeValue = (deleteValue: any, shape: any) => {
  if (Array.isArray(shape) && shape.length > 1) {
    return shape.filter((v) => v !== deleteValue)
  }
  return null
}

const Punctuation: React.FC = () => {
  const styles: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "48px",
    gap: "16px",
  }

  const state = useSchemaState((state) => state)
  const punctuation = state.schemaCustom.patch.punctuation
  const array = Object.keys(punctuation.ascii_style).map((key, index) => {
    return {
      name: key,
      index: index,
      full_shape: (punctuation.full_shape as any)[key],
      half_shape: (punctuation.half_shape as any)[key],
      ascii_style: (punctuation.ascii_style as any)[key],
    }
  })

  return (
    <div style={{ textAlign: "center", maxHeight: "90vh" }}>
      <div
        style={{
          height: "80vh",
          backgroundColor: "white",
          overflowY: "scroll",
          display: "inline-block",
          padding: "32px",
        }}
      >
        <Checkbox
          style={styles}
          onChange={(e: CheckboxChangeEvent) => {
            state.useAsciiStyle(e.target.checked)
          }}
        >
          {}
          只用英文符号
        </Checkbox>
        <div style={{ display: "flex" }}>
          <div style={{ width: "36px", textAlign: "center" }}>符号</div>
          <div style={{ width: "400px", textAlign: "center", marginLeft: "6px" }}>半角符号</div>
          <div style={{ width: "400px", textAlign: "center", marginLeft: "6px" }}>全角符号</div>
        </div>
        {array.map((shape) => {
          return (
            <div style={styles} key={shape.name}>
              <Tag style={{ width: "24px", textAlign: "center", marginLeft: "6px" }}>{shape.name}</Tag>

              <div style={{ width: "400px" }}>
                {shape.half_shape !== null && (
                  <Tags
                    shape={shape.half_shape}
                    onDelete={(e: any) => {
                      console.log(e, "half_shape", "shape.key = ", shape.name)
                      state.changeShape("half_shape", shape.name, removeValue(e, shape.half_shape))
                    }}
                  />
                )}

                <AddTag
                  onPunctuationAdded={(inputValue: string) => {
                    const result = insertNewValue(inputValue, shape.half_shape)
                    state.changeShape("half_shape", shape.name, result)
                    console.log(inputValue, "result", result, "half_shape", "shape.key = ", shape.name)
                  }}
                />
              </div>

              <div style={{ width: "400px" }}>
                {shape.full_shape !== null && (
                  <Tags
                    shape={shape.full_shape}
                    onDelete={(e: any) => {
                      console.log(e, "full_shape", "shape.key = ", shape.name)
                      state.changeShape("full_shape", shape.name, removeValue(e, shape.full_shape))
                    }}
                  />
                )}

                <AddTag
                  onPunctuationAdded={(inputValue: string) => {
                    const result = insertNewValue(inputValue, shape.full_shape)
                    state.changeShape("full_shape", shape.name, result)

                    console.log(inputValue, "result", result, "half_shape", "shape.key = ", shape.name)
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Punctuation
