import React from "react"
import { ClusterOutlined as InputTypeIcon, OrderedListOutlined as MenuSizeIcon } from "@ant-design/icons"
import RimeSettingItem, { RadioChoice } from "../../components/RimeSettingItem"
import IntegerStep from "../../components/IntegerStep"
import { Checkbox } from "antd"
import type { CheckboxValueType } from "antd/es/checkbox/Group"
import useSchemaState from "../../store/SchemaStore"
import useDefaultState, { DefaultState } from "../../store/DefaultStore"

const CheckboxGroup = Checkbox.Group

const Default: React.FC = () => {
  const defaultState = useDefaultState<DefaultState>((store) => store)
  const schemaState = useSchemaState()

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
      <RimeSettingItem icon={<InputTypeIcon style={{ fontSize: "24px", margin: "0px 16px" }} />} title="输入方案">
        <RadioChoice
          values={["pinyin_simp", "double-pinyin", "wubi"]}
          defaultValue={defaultState.defaultCustom.patch.schema_list[0].schema}
          names={["拼音", "双拼", "五笔"]}
          onChange={(value: string) => {
            defaultState.changeTargetSchema(value)
            schemaState.changeSchema(value)
          }}
        />
      </RimeSettingItem>

      <RimeSettingItem icon={<MenuSizeIcon style={{ fontSize: "24px", margin: "0px 16px" }} />} title="候选词数量">
        <IntegerStep
          size={defaultState.defaultCustom.patch["menu/page_size"]}
          onChange={(value: number | null) => {
            defaultState.changePageSize(value!)
          }}
        />
      </RimeSettingItem>

      <RimeSettingItem icon={<MenuSizeIcon style={{ fontSize: "24px", margin: "0px 16px" }} />} title="切换方案热键">
        <CheckboxGroup
          options={["Control+grave", "Control+Shift+grave", "F4"]}
          value={defaultState.defaultCustom.patch["switcher/hotkeys"]}
          onChange={(list: CheckboxValueType[]) => {
            defaultState.changeSwitcherHotkeys(list as string[])
          }}
        />
      </RimeSettingItem>

      {/* 具体方案 */}
      {/* <div>当前方案</div> */}

      {/*  关闭方案选择快捷键( Control + Grave)        放到「按键管理」更合适？?  */}
      {/* <div>更多方案</div> */}
    </div>
  )
}

export default Default
