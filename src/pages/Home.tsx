import { App, Button, FloatButton, Tabs } from "antd"
import { useContext } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import FileSystemHandleContext from "../FileSystemHandleContext"
import { RootState } from "../store/Store"
import { writeYAML } from "../utils/YAMLUtils"

import Default from "./default/Default"
import Punctuation from "./punctuation/Punctuation"
import Skin from "./skin/Skin"
import Style from "./style/Style"

const labels: Array<string> = ["基本", "风格", "皮肤", "符号"]

const children = [<Default />, <Style />, <Skin />, <Punctuation />]

const Home = () => {
  const state = useSelector((state: RootState) => state)
  const { handle } = useContext(FileSystemHandleContext)
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
          if (handle) {
            notification.success({ message: `handel: ${handle.toString()}` })
            // 1. 判断是哪个文件发生改变了
            // 2. 修改文件
            writeYAML("def.custom.yaml", state.defaultCustom.default, handle)
            writeYAML("style.custom.yaml", state.rimeCustom.style, handle)
            writeYAML("schema.custom.yaml", state.schema.schemaCustom, handle)
          } else {
            // todo 返回拖入文件夹/或者弹一个窗口展示拖入文件夹界面
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
          }
        }}
      />
    </>
  )
}

export default Home
