import { Tabs } from "antd"
 
import Default from "./default/Default"
import Punctuation from "./punctuation/Punctuation"
import Skin from "./skin/Skin"
import Style from "./style/Style"

const labels: Array<string> = ["基本", "风格", "皮肤", "符号"]

const children = [<Default />, <Style />, <Skin />, <Punctuation />]

export default () => {
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

      {/*  todo 合适的情况下才会出现 */}
      {/* <FloatButton icon={<UndoOutlined />} type="primary" style={{ right: 94 }} tooltip={<div>Reset</div>} /> */}
      {/*  todo 有配置项改变时，这个按钮才会出现 */}

      {/* <FloatButton type="primary" tooltip={<div>Save</div>} /> */}
    </>
  )
}
