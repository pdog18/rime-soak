import React from "react"
import { PicRightOutlined as InputTypeIcon, DragOutlined } from "@ant-design/icons"
import RimeSettingItem, { RadioChoice } from "../../components/RimeSettingItem"
import AppOptions from "../../components/AppOptions"
import useWeaselStyleState from "../../store/WeaselStyleStore"
import useSquirrelStore from "../theme/squirrel/SquirrelStore"

const Style: React.FC = () => {
  const weasel = navigator.userAgent.indexOf("Win") !== -1

  const squirrelState = useSquirrelStore((state) => state)
  const weaselState = useWeaselStyleState((state) => state)
  const styleState = weasel ? weaselState : squirrelState

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
          defaultValue={styleState.styleCustom.patch["style/horizontal"]}
          names={["水平排列", "垂直排列"]}
          onChange={(value) => styleState.changeStyleHorizontal(value)}
        />
      </RimeSettingItem>

      <RimeSettingItem icon={<InputTypeIcon style={{ fontSize: "24px", margin: "0px 16px" }} />} title="输入字符">
        <RadioChoice
          values={[true, false]}
          defaultValue={styleState.styleCustom.patch["style/inline_preedit"]}
          names={["光标处内嵌", "候选词上方"]}
          onChange={(value) => styleState.changeInlinePreedit(value)}
        />
      </RimeSettingItem>

      <RimeSettingItem icon={<InputTypeIcon style={{ fontSize: "24px", margin: "0px 16px" }} />} title="任务栏图标">
        <RadioChoice
          values={[true, false]}
          defaultValue={styleState.styleCustom.patch["style/display_tray_icon"]}
          names={["显示", "隐藏"]}
          onChange={(value) => styleState.changeDisplayTrayIcon(value)}
        />
      </RimeSettingItem>

      {weasel && (
        <RimeSettingItem icon={<InputTypeIcon style={{ fontSize: "24px", margin: "0px 16px" }} />} title="字符模式">
          <AppOptions
            tags={Object.keys(styleState.styleCustom.patch.app_options)}
            onChange={(input: string[]) => styleState.changeAsciiModeApps(input)}
          />
        </RimeSettingItem>
      )}
    </div>
  )
}

export default Style
