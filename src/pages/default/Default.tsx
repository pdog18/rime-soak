import React from "react"
import {
  ClusterOutlined as InputTypeIcon,
  RetweetOutlined as SimpIcon,
  OrderedListOutlined as MenuSizeIcon,
} from "@ant-design/icons"
import { useDispatch, useSelector } from "react-redux"
import { changeInputMode, changeSimplified, saveDefaultSetting } from "../../store/DefaultSlice"
import { RootState } from "../../store/Store"
import RimeSettingItem, { RadioChoice } from "../../components/RimeSettingItem"
import { App, ConfigProvider, FloatButton } from "antd"

import { changePageSize } from "../../store/DefaultSlice"
import IntegerStep from "../../components/IntegerStep"

const Default: React.FC = () => {
  const state = useSelector((state: RootState) => state)
  const defaultCustom = state.defaultCustom
  const dispatch = useDispatch()
  const { notification } = App.useApp()
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
      <RimeSettingItem icon={<SimpIcon style={{ fontSize: "24px", margin: "0px 16px" }} />} title="简体/繁体">
        <RadioChoice
          values={[true, false]}
          defaultValue={defaultCustom.schema.simplified}
          names={["简体", "繁体"]}
          onChange={(value: boolean) => {
            dispatch(changeSimplified(value))
          }}
        />
      </RimeSettingItem>

      <RimeSettingItem icon={<InputTypeIcon style={{ fontSize: "24px", margin: "0px 16px" }} />} title="输入模式">
        <RadioChoice
          values={["pinyin", "double_pinyin", "wubi"]}
          defaultValue={defaultCustom.schema.inputMode}
          names={["拼音", "双拼", "五笔"]}
          onChange={(value: string) => {
            dispatch(changeInputMode(value))
          }}
        />
      </RimeSettingItem>

      <RimeSettingItem icon={<MenuSizeIcon style={{ fontSize: "24px", margin: "0px 16px" }} />} title="候选词数量">
        <IntegerStep
          size={defaultCustom.default.patch["menu/page_size"]}
          onChange={(value: number | null) => {
            dispatch(changePageSize(value))
          }}
        />
      </RimeSettingItem>

      {/* 具体方案 */}
      {/* <div>当前方案</div> */}

      {/*  关闭方案选择快捷键( Control + Grave)        放到「按键管理」更合适？?  */}
      {/* <div>更多方案</div> */}

      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#673AB7",
          },
        }}
      >
        <FloatButton
          style={{
            display: defaultCustom.default_setting_changed ? "block" : "none",
          }}
          type="primary"
          tooltip={<div>Save</div>}
          onClick={() => {
            dispatch(saveDefaultSetting())
            notification.success({ message: "此页设置保存成功", description: "请执行「重新部署」，使本次修改生效！" })
          }}
        />
      </ConfigProvider>
    </div>
  )
}

export default Default
