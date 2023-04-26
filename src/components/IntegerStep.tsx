import { InputNumber, Row, Slider } from "antd"

type IntegerSetopProps = {
  size: number
  onChange: (value: number) => void
  showSlider?: boolean
  slierWidth?: string
  gap?: string
}

const IntegerSetop = ({ size, onChange, slierWidth = "16vw", showSlider = true }: IntegerSetopProps) => {
  const maxPageSize = navigator.userAgent.indexOf("Win") !== -1 ? 10 : 20
  return (
    <Row>
      {showSlider && (
        <Slider
          style={{ width: slierWidth, marginRight: "16px" }}
          min={1}
          max={maxPageSize}
          onChange={onChange}
          value={size}
        />
      )}

      <InputNumber
        min={1}
        max={maxPageSize}
        style={{
          padding: "0px",
          width: "50px",
        }}
        value={size}
        onChange={(value) => onChange(value as number)}
      />
    </Row>
  )
}

export default IntegerSetop
