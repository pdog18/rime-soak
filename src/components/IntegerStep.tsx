import { InputNumber, Row, Slider } from "antd"

type IntegerSetopProps = {
  size: number
  onChange: (value: number) => void
  slierWidth?: string
}

const IntegerSetop = ({ size, onChange, slierWidth = "16vw" }: IntegerSetopProps) => {
  const maxPageSize = navigator.userAgent.indexOf("Win") !== -1 ? 10 : 9
  return (
    <Row>
      <Slider style={{ width: slierWidth }} min={1} max={maxPageSize} onChange={onChange} value={size} />

      <InputNumber
        min={1}
        max={maxPageSize}
        style={{
          marginLeft: "16px",
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
