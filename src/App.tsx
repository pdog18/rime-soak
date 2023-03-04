import { Tabs } from "antd"

import Style from "./pages/style/Style"
import Skin from "./pages/skin/Skin"
import Punctuation from "./pages/punctuation/Punctuation"
import Default from "./pages/default/Default"
import { useSelector } from "react-redux"
import { RootState } from "./store/Store"

const labels: Array<String> = ["基本", "风格", "皮肤", "符号"]

const children = [<Default />, <Style />, <Skin />, <Punctuation />]

const App: React.FC = () => {
  const state = useSelector((state: RootState) => state)
  const droped = state.defaultCustom.file_droped

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
            disabled: i !== 0 && !droped,
          }
        })}
      />

      {/*  todo 合适的情况下才会出现 */}
      {/* <FloatButton icon={<UndoOutlined />} type="primary" style={{ right: 94 }} tooltip={<div>Reset</div>} /> */}
      {/*  todo 有配置项改变时，这个按钮才会出现 */}

      {/* <FloatButton type="primary" tooltip={<div>Save</div>} /> */}
    </>
  )
}

export default App
