import { theme, InputRef, Space, Input, Button, Tag } from "antd"
import { useState, useRef, useEffect } from "react"
import { useDispatch } from "react-redux"
import {
  changeHalfShapePunctuation,
  changeFullShapePunctuation,
} from "../../store/PunctuSlice"
import { PlusCircleFilled as PlusIcon } from "@ant-design/icons"

export const AddTag = (prop: any) => {
  const { item, record, type } = prop

  const { token } = theme.useToken()
  const [inputVisible, setInputVisible] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const inputRef = useRef<InputRef>(null)
  const editInputRef = useRef<InputRef>(null)

  const dispatch = useDispatch()

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus()
    }
  }, [inputVisible])

  useEffect(() => {
    editInputRef.current?.focus()
  }, [inputValue])

  const showInput = () => {
    setInputVisible(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleInputConfirm = () => {
    if (inputValue.trim().length === 0) {
      setInputValue("")
      return
    }

    let shape = type === "half_shape" ? record.half_shape : record.full_shape

    // 如果是空，那么 shape 变成 inputValue 追加
    if (Object.keys(shape).length === 0 || !shape) {
      console.log("shape 是空的 shape = ", shape, "  inputValue = ", inputValue)
      shape = inputValue
    } else if (Array.isArray(shape)) {
      // 如果是 array 直接追加
      shape = [...shape, inputValue]
    } else {
      // 把原来的值转成string，然后和 inputValue 一起加入到数组
      let real = shape

      if (typeof item === "string") {
        real = shape
      }

      if (shape["commit"] !== undefined) {
        real = shape["commit"]
      }

      if (shape["pair"] !== undefined) {
        real = shape["pair"]
      }

      shape = [real, inputValue]
    }

    if (type === "half_shape") {
      const newShape = {
        ...record,
        half_shape: shape,
      }
      dispatch(changeHalfShapePunctuation(newShape))
    } else {
      const newShape = {
        ...record,
        full_shape: shape,
      }
      dispatch(changeFullShapePunctuation(newShape))
    }

    setInputVisible(false)
    setInputValue("")
  }

  const tagInputStyle: React.CSSProperties = {
    width: 38,
    verticalAlign: "top",
  }

  const tagPlusStyle: React.CSSProperties = {
    background: token.colorBgContainer,
    borderStyle: "dashed",
  }

  return (
    <Space size={[0, 8]} wrap>
      {inputVisible ? (
        <Input.Group style={{}}>
          <Input
            maxLength={2}
            ref={inputRef}
            type="text"
            size="small"
            style={tagInputStyle}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputConfirm}
            onPressEnter={handleInputConfirm}
          />
          <Button
            icon={<PlusIcon style={{ color: "#7cc778" }} />}
            size="small"
          />
        </Input.Group>
      ) : (
        <Tag style={tagPlusStyle} onClick={showInput}>
          <PlusIcon style={{ fontSize: "14px", color: "#7cc778" }} />
        </Tag>
      )}
    </Space>
  )
}

export default AddTag
