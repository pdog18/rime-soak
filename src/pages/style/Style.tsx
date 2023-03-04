import React from "react"
import { useDispatch } from "react-redux/es/hooks/useDispatch"
import { useSelector } from "react-redux/es/exports"

import { App, ConfigProvider, FloatButton } from "antd"
import { PicRightOutlined as InputTypeIcon, DragOutlined } from "@ant-design/icons"

import { changeDisplayTrayIcon, changeOrientation, changePreedit, saveStyleSetting } from "../../store/StyleSlice"

import RimeSettingItem, { RadioChoice } from "../../components/RimeSettingItem"
import { RootState } from "../../store/Store"

const Style: React.FC = () => {
  const state = useSelector((state: RootState) => state)
  const rimePatch = state.rimeCustom.style.patch
  const dispatch = useDispatch()

  const showSaveButton = state.rimeCustom.basic_setting_changed

  const { notification } = App.useApp()

  return (
    <div
      style={{
        display: "flex",
        gap: "16px",
        margin: "4vh 4vw",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <RimeSettingItem icon={<DragOutlined style={{ fontSize: "24px", margin: "0px 16px" }} />} title="候选词方向">
        <RadioChoice
          values={[true, false]}
          defaultValue={rimePatch["style/horizontal"]}
          names={["水平排列", "垂直排列"]}
          onChange={(value: boolean) => {
            dispatch(changeOrientation(value))
          }}
        />
      </RimeSettingItem>

      <RimeSettingItem icon={<InputTypeIcon style={{ fontSize: "24px", margin: "0px 16px" }} />} title="输入字符">
        <RadioChoice
          values={[true, false]}
          defaultValue={rimePatch["style/inline_preedit"]}
          names={["光标处内嵌", "候选词上方"]}
          onChange={(value: boolean) => {
            dispatch(changePreedit(value))
          }}
        />
      </RimeSettingItem>

      <RimeSettingItem icon={<InputTypeIcon style={{ fontSize: "24px", margin: "0px 16px" }} />} title="任务栏图标">
        <RadioChoice
          values={[true, false]}
          defaultValue={rimePatch["style/display_tray_icon"]}
          names={["显示", "隐藏"]}
          onChange={(value: boolean) => {
            dispatch(changeDisplayTrayIcon(value))
          }}
        />
      </RimeSettingItem>

      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#4CAF50",
          },
        }}
      >
        <FloatButton
          style={{ display: showSaveButton ? "block" : "none" }}
          type="primary"
          tooltip={<div>Save</div>}
          onClick={() => {
            dispatch(saveStyleSetting())
            notification.success({ message: "style 保存成功", description: "请执行「重新部署」，使本次修改生效！" })
          }}
        />
      </ConfigProvider>
    </div>
  )
}

export default Style
