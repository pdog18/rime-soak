import { useState, ChangeEvent } from "react"

export function useTextInput(initialValue: string) {
  const [value, setValue] = useState<string>(initialValue)

  return {
    value,
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value)
    },
    type: "text",
  }
}
