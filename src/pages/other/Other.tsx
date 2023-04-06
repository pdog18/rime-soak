import React from "react"
import { ClusterOutlined as InputTypeIcon } from "@ant-design/icons"
import RimeSettingItem from "../../components/RimeSettingItem"
import { Switch } from "antd"
import useSchemaState from "../../store/SchemaStore"
import useRimeLuaState from "../../store/RimeLuaStore"

const Default: React.FC = () => {
  const schemaState = useSchemaState()
  const rimeLuaState = useRimeLuaState()

  console.log(schemaState.schemaCustom.patch["engine/translators/+"])

  return (
    <div
      style={{
        margin: "4vh 4vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "16px",
      }}
    >
      <RimeSettingItem icon={<InputTypeIcon />} title="快速输入时间">
        <Switch
          checked={rimeLuaState.time}
          onChange={(checked) => {
            schemaState.quickType(checked, "time")
            rimeLuaState.quickType(checked, "time")
          }}
        />
      </RimeSettingItem>
      <RimeSettingItem icon={<InputTypeIcon />} title="快速输入日期">
        <Switch
          checked={rimeLuaState.date}
          onChange={(checked) => {
            schemaState.quickType(checked, "date")
            rimeLuaState.quickType(checked, "date")
          }}
        />
      </RimeSettingItem>
      <RimeSettingItem icon={<InputTypeIcon />} title="快速输入星期">
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
