import { InputNumber, Row, Slider } from "antd"

const IntegerSetop = (props: { size: number; onChange: (value: number | null) => void }) => {
  return (
    <Row>
      <Slider style={{ width: "20vw" }} min={4} max={10} onChange={props.onChange} value={props.size} />

      <InputNumber
        min={4}
        max={9}
        style={{
          marginLeft: "16px",
          padding: "0px",
          width: "50px",
        }}
        value={props.size}
        onChange={props.onChange}
      />
    </Row>
  )
}

export default IntegerSetop
