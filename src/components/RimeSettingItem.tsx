import { Card, Radio, RadioChangeEvent, Row, Space } from "antd";
import { ReactNode } from "react";

const RimeSettingItem = <T,>(props: {
  children: ReactNode,
  title: string,
  values: T[],
  defaultValue: T,
  names: string[],
  onChange: (e: T) => void,
  icon?: ReactNode
}): JSX.Element => (<Card>
  <Row
    style={{ width: '60vw' }}
    justify='space-between' >
    <Space>
      {props.children}
      {props.title}
    </Space>

    <Radio.Group
      buttonStyle="solid"
      defaultValue={props.defaultValue}
      onChange={({ target: { value } }: RadioChangeEvent) => {
        props.onChange(value)
      }}>
      {props.values.map((value, index) =>
        <Radio.Button
          key={`${value}`}
          value={value}>{props.names[index]}
        </Radio.Button>)
      }
    </Radio.Group>
  </Row>
</Card>);

export default RimeSettingItem;