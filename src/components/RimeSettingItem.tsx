import { Card, Radio, RadioChangeEvent, Row, Space } from "antd"
import { ReactNode } from "react"

type Props = {
  icon: ReactNode
  title: string
  children: ReactNode
}

type RadioChoiceProps<T> = {
  names: string[]
  values: T[]
  defaultValue: T
  onChange: (e: T) => void
}

export const RadioChoice = <T,>(props: RadioChoiceProps<T>) => (
  <Radio.Group
    buttonStyle="solid"
    defaultValue={props.defaultValue}
    size="small"
    onChange={({ target: { value } }: RadioChangeEvent) => {
      props.onChange(value)
    }}
  >
    {props.values.map((value, index) => (
      <Radio.Button key={`${value}`} value={value}>
        {props.names[index]}
      </Radio.Button>
    ))}
  </Radio.Group>
)

const RimeSettingItem = (props: Props) => (
  <Card>
    <Row style={{ width: "60vw" }} justify="space-between">
      <Space>
        {props.icon}
        {props.title}
      </Space>

      {props.children}
    </Row>
  </Card>
)

export default RimeSettingItem
