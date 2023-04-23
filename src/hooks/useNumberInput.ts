import { useState, ChangeEvent } from "react"

export function useNumberInput(initialValue: number) {
  const [value, setValue] = useState<number>(initialValue)

  return {
    value,
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      setValue(Number(e.target.value))
    },
    type: "number",
  }
}
