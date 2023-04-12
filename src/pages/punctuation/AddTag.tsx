import { InputRef, Space, Input, Button, Tag, Checkbox } from "antd"
import { useState, useRef, useEffect } from "react"
import { PlusCircleFilled as PlusIcon, CloseCircleFilled as CloseIcon } from "@ant-design/icons"
import { CheckboxChangeEvent } from "antd/es/checkbox"

interface AddTagProps {
  onPunctuationAdded: (shape: string, pair: boolean) => void
  checkbox: boolean
}

export const AddTag = ({ onPunctuationAdded, checkbox }: AddTagProps) => {
  const [inputVisible, setInputVisible] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const inputRef = useRef<InputRef>(null)
  const editInputRef = useRef<InputRef>(null)
  const [pair, changePairState] = useState(false)
  const changePair = (e: CheckboxChangeEvent) => {
    changePairState(e.target.checked)
  }

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus()
    }
  }, [inputVisible])

  useEffect(() => {
    editInputRef.current?.focus()
  }, [inputValue])

  const handleInputConfirm = () => {
    if (inputValue.length === 0) {
      console.log("length === 0 ")

      return
    }

    onPunctuationAdded(inputValue, pair)

    setInputVisible(false)
    setInputValue("")
  }

  return (
    <Space size={[0, 8]} wrap>
      {inputVisible ? (
        <Input.Group style={{ display: "inline-flex", border: "black dashed 1px" }}>
          <Input
            maxLength={2}
            ref={inputRef}
            type="text"
            size="small"
            style={{
              width: 38,
              verticalAlign: "top",
            }}
            value={inputValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setInputValue(e.target.value)
            }}
            onPressEnter={handleInputConfirm}
          />
          {checkbox && (
            <div title="pair" style={{ margin: "0 8px" }}>
              <Checkbox onChange={changePair} />
            </div>
          )}

          <Button icon={<PlusIcon style={{ color: "#7cc778" }} />} size="small" onClick={handleInputConfirm} />
          <Button
            icon={<CloseIcon style={{ fontSize: "14px" }} />}
            size="small"
            onClick={() => setInputVisible(false)}
          />
        </Input.Group>
      ) : (
        <Tag
          style={{
            borderStyle: "dashed",
          }}
          onClick={() => {
            setInputVisible(true)
          }}
        >
          <PlusIcon style={{ fontSize: "14px", color: "#7cc778" }} />
        </Tag>
      )}
    </Space>
  )
}

export default AddTag
