import React from "react"
import { ClusterOutlined as InputTypeIcon, OrderedListOutlined as MenuSizeIcon } from "@ant-design/icons"
import { useDispatch, useSelector } from "react-redux"
import { changeTargetSchema } from "../../store/DefaultSlice"
import { RootState } from "../../store/Store"
import RimeSettingItem, { RadioChoice } from "../../components/RimeSettingItem"

import { changePageSize } from "../../store/DefaultSlice"
import IntegerStep from "../../components/IntegerStep"
import { changeSchemaName } from "../../store/SchemaSlice"

const Default: React.FC = () => {
  const state = useSelector((state: RootState) => state)
  const defaultCustom = state.default
  const dispatch = useDispatch()

  /**
   *   - schema: luna_pinyin
  - schema: luna_pinyin_simp
  - schema: luna_pinyin_fluency
  - schema: bopomofo
  - schema: bopomofo_tw
  - schema: cangjie5
  - schema: stroke
  - schema: terra_pinyin
  - schema: bopomofo_express
  - schema: cangjie5_express
  - schema: luna_pinyin_tw
  - schema: luna_quanpin
   */
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

      {/* 具体方案 */}
      {/* <div>当前方案</div> */}

      {/*  关闭方案选择快捷键( Control + Grave)        放到「按键管理」更合适？?  */}
      {/* <div>更多方案</div> */}
    </div>
  )
}

export default Default
