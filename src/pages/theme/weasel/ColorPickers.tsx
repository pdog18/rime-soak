import ColorPickerWithInput from "./ColorPickerWithInput"

interface ColorPickersProps {
  filterColors: [string, string][]
  onColorChanged: (newcolor: string, name: string) => void
}

export default function ColorPickers({ filterColors, onColorChanged }: ColorPickersProps) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        columnGap: `${filterColors.length > 9 ? "8vw" : "2vw"}`,
        rowGap: "2vh",
        margin: "4vh 0vw",
        justifyContent: "center",
      }}
    >
      {filterColors.map(([name, color]) => {
        return <ColorPickerWithInput key={name} name={name} color={color} onColorChanged={onColorChanged} />
      })}
    </div>
  )
}
