import { InputRef, Space, Input, Button, Tag } from "antd"
import { useState, useRef, useEffect } from "react"
import { PlusCircleFilled as PlusIcon } from "@ant-design/icons"

interface AddTagProps {
  onPunctuationAdded: (shape: string) => void
}

export const AddTag = ({ onPunctuationAdded }: AddTagProps) => {
  const [inputVisible, setInputVisible] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const inputRef = useRef<InputRef>(null)
  const editInputRef = useRef<InputRef>(null)

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus()
    }
  }, [inputVisible])

  useEffect(() => {
    editInputRef.current?.focus()
  }, [inputValue])

  const handleInputConfirm = () => {
    onPunctuationAdded(inputValue)

    setInputVisible(false)
    setInputValue("")
  }

  return (
    <Space size={[0, 8]} wrap>
      {inputVisible ? (
        <Input.Group>
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
            onBlur={handleInputConfirm}
            onPressEnter={handleInputConfirm}
          />
          <Button icon={<PlusIcon style={{ color: "#7cc778" }} />} size="small" />
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
