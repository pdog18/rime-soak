import { CSSProperties, useState } from "react"

interface KeyInputProps extends CSSProperties {
  defaultValue: string
  disabled: boolean
  onChanged: (newvalue: string) => void
}
const mapForRime = (input: string[]): string[] => {
  return input.map((code) => {
    if (code.startsWith("Key")) {
      return code.replace("Key", "").toLowerCase()
    }

    if (code.startsWith("Digit")) {
      return code.replace("Digit", "")
    }

    if (code === "Control" || code === "Shift" || code === "Alt" || code === "Tab") {
      return code
    }

    const replaceMap: { [key: string]: string } = {
      Page: "Page_",
      KP: "KP_",
      ShiftLock: "Shift_Lock",
      CapsLock: "Caps_Lock",
      ScrollLock: "Scroll_Lock",
    }

    for (const key in replaceMap) {
      if (code.startsWith(key)) {
        return code.replace(key, replaceMap[key])
      }
    }

    return code.toLowerCase()
  })
}

const KeyInput: React.FC<KeyInputProps> = ({ defaultValue, disabled, display, onChanged }) => {
  const [keyName, setKeyName] = useState(defaultValue)

  return (
    <input
      style={{ display, width: "200px" }}
      value={keyName}
      disabled={disabled}
      onKeyDown={(event) => {
        event.preventDefault()

        const keys = []

        if (event.ctrlKey) {
          keys.push("Control")
        }
        if (event.shiftKey) {
          keys.push("Shift")
        }
        if (event.altKey) {
          keys.push("Alt")
        }

        // 过滤掉修饰键本身，例如 "Control", "Shift" 和 "Alt"
        if (
          ![
            "Control",
            "Shift",
            "Alt",
            "ControlLeft",
            "ControlRight",
            "ShiftLeft",
            "ShiftRight",
            "AltLeft",
            "AltRight",
          ].includes(event.code)
        ) {
          keys.push(event.code)
        }

        const newValue = mapForRime(keys).join("+")
        setKeyName(newValue)
        onChanged(newValue)
      }}
    />
  )
}

export default KeyInput
