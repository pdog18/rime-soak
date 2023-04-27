type SquirrelSelectProps = {
  title?: string
  name: string
  options: string[]
  value: string
  onChange: (name: string, value: string) => void
  disable?: boolean
  flexDirection?: `row` | `row-reverse` | `column` | `column-reverse`
  style?: React.CSSProperties
}

export default function SquirrelSelect({
  title,
  name,
  options,
  value,
  onChange,
  disable,
  flexDirection = "column",
  style,
}: SquirrelSelectProps) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", flexDirection, ...style }}>
      {title && <label style={{ alignSelf: "start" }}>{title}</label>}

      <select
        value={value}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          onChange(name, e.target.value)
        }}
        size={options.length}
        style={{ minWidth: "40px", textAlign: "center", overflowY: "auto" }}
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
