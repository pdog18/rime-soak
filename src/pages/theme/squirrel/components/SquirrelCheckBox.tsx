type SquirrelCheckBoxProps = {
  name: string
  checked: boolean
  onChange: (name: string, checked: boolean) => void
}

export default function SquirrelCheckBox({ name, checked, onChange }: SquirrelCheckBoxProps) {
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
