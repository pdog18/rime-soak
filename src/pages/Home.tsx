import { Tabs } from "antd"

import Default from "./default/Default"
import Punctuation from "./punctuation/Punctuation"
import Skin from "./skin/Skin"
import Style from "./style/Style"

const labels: Array<string> = ["基本", "风格", "皮肤", "符号"]

const children = [<Default />, <Style />, <Skin />, <Punctuation />]

const Home = () => {
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
    </>
  )
}

export default Home
