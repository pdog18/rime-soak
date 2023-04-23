import { useState, ChangeEvent } from "react"

type Option<T> = {
  label: string
  value: T
}

export function useSelectInput<T extends string>(options: T[] | Option<T>[], selectedIndex: number = 0) {
  const normalizedOptions = options.map((option) =>
    typeof option === "string" ? { label: option, value: option } : option
  ) as Option<T>[]

  const [value, setValue] = useState<T>(normalizedOptions[selectedIndex].value)

  return {
    value,
    onChange: (e: ChangeEvent<HTMLSelectElement>) => {
      setValue(e.target.value as T)
    },
    options: normalizedOptions,
  }
}
