import React, { useState } from "react"
import { ClusterOutlined as InputTypeIcon, OrderedListOutlined as MenuSizeIcon } from "@ant-design/icons"
import { useDispatch, useSelector } from "react-redux"
import { changeSwitcherHotkeys, changeTargetSchema } from "../../store/DefaultSlice"
import { RootState } from "../../store/Store"
import RimeSettingItem, { RadioChoice } from "../../components/RimeSettingItem"

import { changePageSize } from "../../store/DefaultSlice"
import IntegerStep from "../../components/IntegerStep"
import { changeSchemaName } from "../../store/SchemaSlice"

import { Checkbox } from "antd"

import type { CheckboxValueType } from "antd/es/checkbox/Group"

const CheckboxGroup = Checkbox.Group

const plainOptions = ["Control+grave", "Control+Shift+grave", "F4"]

const Default: React.FC = () => {
  const state = useSelector((state: RootState) => state)
  const defaultCustom = state.default
  const dispatch = useDispatch()

  const checkedList = state.default.defaultCustom.patch["switcher/hotkeys"]

  const onChange = (list: CheckboxValueType[]) => {
    dispatch(changeSwitcherHotkeys(list))
  }

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
          values={["luna_pinyin_simp", "double-pinyin", "wubi"]}
          defaultValue={defaultCustom.defaultCustom.patch.schema_list[0].schema}
          names={["拼音", "双拼", "五笔"]}
          onChange={(value: string) => {
            dispatch(changeTargetSchema(value))
            dispatch(changeSchemaName(value))
          }}
        />
      </RimeSettingItem>

      <RimeSettingItem icon={<MenuSizeIcon style={{ fontSize: "24px", margin: "0px 16px" }} />} title="候选词数量">
        <IntegerStep
          size={defaultCustom.defaultCustom.patch["menu/page_size"]}
          onChange={(value: number | null) => {
            dispatch(changePageSize(value))
          }}
        />
      </RimeSettingItem>

      <RimeSettingItem icon={<MenuSizeIcon style={{ fontSize: "24px", margin: "0px 16px" }} />} title="切换方案热键">
        <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
      </RimeSettingItem>

      {/* 具体方案 */}
      {/* <div>当前方案</div> */}
      {}

      {/*  关闭方案选择快捷键( Control + Grave)        放到「按键管理」更合适？?  */}
      {/* <div>更多方案</div> */}
    </div>
  )
}

export default Default
