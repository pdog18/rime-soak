type SquirrelNumberInputProps = {
  title?: string
  name: string
  value: number
  onChange: (name: string, value: number) => void
  min?: number
  max?: number
  disable?: boolean
  step?: number
}

export default function SquirrelNumberInput({
  title,
  name,
  value,
  onChange,
  min,
  max,
  disable,
  step = 1,
}: SquirrelNumberInputProps) {
  return (
    <div style={{ display: "inline-flex", flexDirection: "column" }}>
      <label>{title ?? name}</label>

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
