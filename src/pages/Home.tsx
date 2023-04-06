import { FloatButton, Tabs } from "antd"

import Default from "./default/Default"
import Punctuation from "./punctuation/Punctuation"
import Skin from "./skin/Skin"
import Style from "./style/Style"
import { useNavigate } from "react-router-dom"
import Other from "./other/Other"

const labels: Array<string> = ["基本", "风格", "皮肤", "符号", "其他"]

const children = [<Default />, <Style />, <Skin />, <Punctuation />, <Other />]

const Home = () => {
  const navigate = useNavigate()

  return (
    <>
      <Tabs
        centered={true}
        style={{ height: "100%", minHeight: "100vh", backgroundColor: "#f3f3f3" }}
        items={labels.map((_, i) => {
          return {
            label: `${labels[i]}`,
            key: String(i),
            children: children[i],
          }
        })}
      />

      <FloatButton
        type="primary"
        tooltip={<div>Save</div>}
        onClick={() => {
          navigate("/result")
        }}
      />
    </>
  )
}

export default Home
