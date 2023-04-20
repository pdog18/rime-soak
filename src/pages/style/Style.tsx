import React from "react"
import { PicRightOutlined as InputTypeIcon, DragOutlined } from "@ant-design/icons"
import RimeSettingItem, { RadioChoice } from "../../components/RimeSettingItem"
import AppOptions from "../../components/AppOptions"
import useStyleState from "../../store/StyleStore"

const Style: React.FC = () => {
  const {
    changeAsciiModeApps,
    updateStyleCustom,

    styleCustom: { patch: stylePatch },
  } = useStyleState((state) => state)

  return (
    <div
      style={{
        display: "flex",
        gap: "16px",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <RimeSettingItem icon={<DragOutlined style={{ fontSize: "24px", margin: "0px 16px" }} />} title="候选词方向">
        <RadioChoice
          values={[true, false]}
          defaultValue={stylePatch["style/horizontal"]}
          names={["水平排列", "垂直排列"]}
          onChange={(value) => updateStyleCustom("style/horizontal", value)}
        />
      </RimeSettingItem>

      <RimeSettingItem icon={<InputTypeIcon style={{ fontSize: "24px", margin: "0px 16px" }} />} title="输入字符">
        <RadioChoice
          values={[true, false]}
          defaultValue={stylePatch["style/inline_preedit"]}
          names={["光标处内嵌", "候选词上方"]}
          onChange={(value) => updateStyleCustom("style/inline_preedit", value)}
        />
      </RimeSettingItem>

      <RimeSettingItem icon={<InputTypeIcon style={{ fontSize: "24px", margin: "0px 16px" }} />} title="任务栏图标">
        <RadioChoice
          values={[true, false]}
          defaultValue={stylePatch["style/display_tray_icon"]}
          names={["显示", "隐藏"]}
          onChange={(value) => updateStyleCustom("style/display_tray_icon", value)}
        />
      </RimeSettingItem>

      <RimeSettingItem icon={<InputTypeIcon style={{ fontSize: "24px", margin: "0px 16px" }} />} title="字符模式">
        <AppOptions
          tags={Object.keys(stylePatch.app_options)}
          onChange={(input: string[]) => {
            changeAsciiModeApps(input)
          }}
        />
      </RimeSettingItem>
    </div>
  )
}

export default Style
