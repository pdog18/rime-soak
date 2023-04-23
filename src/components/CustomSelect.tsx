import { ChangeEvent } from "react"

interface CustomSelectProps {
  options: { value: string; label: string }[]
  value: string
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
  disable?: boolean
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, value, onChange, disable = false }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      size={options.length}
      style={{ minWidth: "60px", overflowY: "auto" }}
      disabled={disable}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}
export default CustomSelect
