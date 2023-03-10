import { App, Button, FloatButton, Tabs } from "antd"
import { useContext } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import FileSystemHandleContext from "../FileSystemHandleContext"
import { SoakSnapshot } from "../OriginContext"
import ShapShotContext from "../OriginContext"
import { RootState } from "../store/Store"
import { writeYAML } from "../utils/YAMLUtils"
import { isEqual } from "lodash"

import Default from "./default/Default"
import Punctuation from "./punctuation/Punctuation"
import Skin from "./skin/Skin"
import Style from "./style/Style"

const labels: Array<string> = ["基本", "风格", "皮肤", "符号"]

const children = [<Default />, <Style />, <Skin />, <Punctuation />]

const saveSettings = (handle: FileSystemDirectoryHandle, state: RootState, soakDefault: SoakSnapshot) => {
  // console.log(handle, state, soakDefault)
  console.log(isEqual(state.default.defaultCustom, soakDefault.soakDefault))
  console.log(isEqual(state.style.styleCustom, soakDefault.soakStyle))
  console.log(isEqual(state.schema.schemaCustom, soakDefault.soakSchema))
}

const Home = () => {
  const state = useSelector((state: RootState) => state)
  const { handle } = useContext(FileSystemHandleContext)
  const { soakDefault } = useContext(ShapShotContext)
  const { notification } = App.useApp()
  const navigate = useNavigate()

  return (
    <>
      <Tabs
        centered={true}
        style={{ height: "100vh", backgroundColor: "#f3f3f3" }}
        items={labels.map((_, i) => {
          const id = String(i)
          return {
            label: `${labels[i]}`,
            key: id,
            children: children[i],
          }
        })}
      />

      <FloatButton
        type="primary"
        tooltip={<div>Save</div>}
        onClick={() => {
          if (!handle) {
            notification.warning({
              message: "需要 Rime 用户文件夹",
              btn: (
                <Button
                  type="dashed"
                  onClick={() => {
                    navigate("/")
                  }}
                >
                  返回上页，关联 Rime
                </Button>
              ),
            })
          } else {
            saveSettings(handle, state, soakDefault!)
          }
        }}
      />
    </>
  )
}

export default Home
