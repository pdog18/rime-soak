type SquirrelCheckBoxProps = {
  title?: string
  name: string
  checked: boolean
  onChange: (name: string, checked: boolean) => void
}

export default function SquirrelCheckBox({ title, name, checked, onChange }: SquirrelCheckBoxProps) {
  return (
    <div>
      <label>{title ?? name}</label>

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
