import React from "react"
import { ClusterOutlined as InputTypeIcon } from "@ant-design/icons"
import RimeSettingItem from "../../components/RimeSettingItem"
import { Switch } from "antd"
import useSchemaState, { SchemaState } from "../../store/SchemaStore"
import useRimeLuaState from "../../store/RimeLuaStore"

const Default: React.FC = () => {
  const schemaState: SchemaState = useSchemaState()
  const rimeLuaState = useRimeLuaState()

  const iconStyle = { fontSize: "24px", margin: "0px 16px" }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "16px",
      }}
    >
      <RimeSettingItem icon={<InputTypeIcon style={iconStyle} />} title="英语单词">
        <Switch
          checked={schemaState.supportEnglishWord}
          onChange={(checked) => {
            schemaState.enableEnglishWord(checked)
          }}
        />
      </RimeSettingItem>

      <RimeSettingItem icon={<InputTypeIcon style={iconStyle} />} title="快速输入时间">
        <Switch
          checked={rimeLuaState.time}
          onChange={(checked) => {
            schemaState.quickType(checked, "time")
            rimeLuaState.quickType(checked, "time")
          }}
        />
      </RimeSettingItem>
      <RimeSettingItem icon={<InputTypeIcon style={iconStyle} />} title="快速输入日期">
        <Switch
          checked={rimeLuaState.date}
          onChange={(checked) => {
            schemaState.quickType(checked, "date")
            rimeLuaState.quickType(checked, "date")
          }}
        />
      </RimeSettingItem>
      <RimeSettingItem icon={<InputTypeIcon style={iconStyle} />} title="快速输入星期">
        <Switch
          checked={rimeLuaState.week}
          onChange={(checked) => {
            schemaState.quickType(checked, "week")
            rimeLuaState.quickType(checked, "week")
          }}
        />
      </RimeSettingItem>
    </div>
  )
}

export default Default
