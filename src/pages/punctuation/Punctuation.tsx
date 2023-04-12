import { CSSProperties } from "react"

import { Tag, Checkbox } from "antd"
import Tags from "./Tags"
import AddTag from "./AddTag"
import type { CheckboxChangeEvent } from "antd/es/checkbox"
import useSchemaState from "../../store/SchemaStore"

const insertValueToShape = (inputValue: string, shape: any, pair: boolean) => {
  if (shape === null || Object.keys(shape).length === 0) {
    if (pair) {
      return {
        pair: [inputValue[0], inputValue[1]],
      }
    }
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
  const punctuation = state.schemaCustom.patch.punctuator
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
        <div
          style={{
            display: "inline-flex",
            flexDirection: "column",
            textAlign: "center",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div>[蓝 = 上屏]</div>
          <div>[绿 = 成对 (空时可添加)]</div>

          <Checkbox
            onChange={(e: CheckboxChangeEvent) => {
              state.useAsciiStyle(e.target.checked)
            }}
          >
            只用英文符号
          </Checkbox>
        </div>

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
                      state.changeShape("half_shape", shape.name, removeValue(e, shape.half_shape))
                    }}
                  />
                )}

                <AddTag
                  checkbox={shape.half_shape === null}
                  onPunctuationAdded={(inputValue: string, pair: boolean) => {
                    const result = insertValueToShape(inputValue, shape.half_shape, pair)
                    state.changeShape("half_shape", shape.name, result)
                  }}
                />
              </div>

              <div style={{ width: "400px" }}>
                {shape.full_shape !== null && (
                  <Tags
                    shape={shape.full_shape}
                    onDelete={(e: any) => {
                      state.changeShape("full_shape", shape.name, removeValue(e, shape.full_shape))
                    }}
                  />
                )}

                <AddTag
                  checkbox={shape.full_shape === null}
                  onPunctuationAdded={(inputValue: string, pair: boolean) => {
                    const result = insertValueToShape(inputValue, shape.full_shape, pair)
                    state.changeShape("full_shape", shape.name, result)
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
