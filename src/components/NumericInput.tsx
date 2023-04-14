import React from "react"
import { Input } from "antd"

interface NumericInputProps {
  style: React.CSSProperties
  value: number
  maxLength?: number
  onChange: (value: number) => void
  placeholder?: string
  defaultValue?: number
}

export default function NumericInput({
  style,
  value,
  maxLength,
  onChange,
  placeholder,
  defaultValue,
}: NumericInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target
    const reg = /^-?\d*(\.\d*)?$/
    if (reg.test(inputValue) || inputValue === "" || inputValue === "-") {
      onChange(parseInt(inputValue))
    }
  }

  // '.' at the end or only '-' in the input box.
  const handleBlur = () => {
    let valueTemp = value.toString()
    const svalue = value.toString()
    if (svalue.charAt(svalue.length - 1) === "." || svalue === "-") {
      valueTemp = svalue.slice(0, -1)
    }
    onChange(parseInt(valueTemp.replace(/0*(\d+)/, "$1")))
  }

  return (
    <Input
      style={style}
      onChange={handleChange}
      onBlur={handleBlur}
      maxLength={maxLength}
      placeholder={placeholder}
      defaultValue={defaultValue}
    />
  )
}
