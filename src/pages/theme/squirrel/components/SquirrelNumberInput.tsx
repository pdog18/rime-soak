type SquirrelNumberInputProps = {
  name: string
  value: number
  onChange: (name: string, value: number) => void
  min?: number
  max?: number
  disable?: boolean
  step?: number
}

export default function SquirrelNumberInput({
  name,
  value,
  onChange,
  min,
  max,
  disable,
  step = 1,
}: SquirrelNumberInputProps) {
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
