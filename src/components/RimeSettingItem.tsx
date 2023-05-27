import { Card, Radio, RadioChangeEvent } from "antd"
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
      <Radio.Button key={`${value}`} value={value} checked={props.defaultValue === value}>
        {props.names[index]}
      </Radio.Button>
    ))}
  </Radio.Group>
)

const RimeSettingItem = (props: Props) => (
  <Card>
    <div
      style={{
        width: "60vw",
        display: "inline-flex",
        justifyContent: "space-between",
        gap: "4vw",
        alignItems: "center",
      }}
    >
      <div style={{ width: "140px", display: "inline-flex", whiteSpace: "nowrap" }}>
        <div> {props.icon} </div>

        {props.title}
      </div>

      <div style={{ marginLeft: "auto" }}>{props.children}</div>
    </div>
  </Card>
)

export default RimeSettingItem
