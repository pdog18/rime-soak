type SquirrelSelectProps = {
  name: string
  options: string[]
  value: string
  onChange: (name: string, value: string) => void
  disable?: boolean
}

export default function SquirrelSelect({ name, options, value, onChange, disable }: SquirrelSelectProps) {
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
