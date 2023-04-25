type SquirrelNumberInputProps = {
  name: string
  value: number
  onChange: (name: string, value: number) => void
  min?: number
  max?: number
  disable?: boolean
  step?: number
}

export function SquirrelNumberInput({ name, value, onChange, min, max, disable, step = 1 }: SquirrelNumberInputProps) {
  return (
    <div>
      <label>{name}</label>

      <input
        min={min}
        max={max}
        type="number"
        value={value}
        step={step}
        disabled={disable}
        onChange={(e) => {
          onChange(name, Number(e.target.value))
        }}
        style={{ width: "3em" }}
      />
    </div>
  )
}

type SquirrelCheckBoxProps = {
  name: string
  checked: boolean
  onChange: (name: string, checked: boolean) => void
}

function SquirrelCheckBox({ name, checked, onChange }: SquirrelCheckBoxProps) {
  return (
    <div>
      <label>{name}</label>

      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => {
          onChange(name, e.target.checked)
        }}
      />
    </div>
  )
}

type SquirrelSelectProps = {
  name: string
  options: string[]
  value: string
  onChange: (name: string, value: string) => void
  disable?: boolean
}

function SquirrelSelect({ name, options, value, onChange, disable }: SquirrelSelectProps) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center" }}>
      <label>{name}</label>

      <select
        value={value}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          onChange(name, e.target.value)
        }}
        size={options.length}
        style={{ minWidth: "60px", overflowY: "auto" }}
        disabled={disable}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export { SquirrelSelect, SquirrelCheckBox }
