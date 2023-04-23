import { useState, ChangeEvent } from "react"

export function useCheckBox(initialValue: boolean) {
  const [checked, setValue] = useState<boolean>(initialValue)

  return {
    checked,
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.checked)
    },
    type: "checkbox",
  }
}
