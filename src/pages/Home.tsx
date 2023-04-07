import { FloatButton, Tabs } from "antd"

import Default from "./default/Default"
import Punctuation from "./punctuation/Punctuation"
import Skin from "./skin/Skin"
import Style from "./style/Style"
import { useNavigate } from "react-router-dom"
import Other from "./other/Other"
import CustomPhrase from "./customPhrase/CustomPhrase"

const items = [
  {
    label: "基本",
    children: <Default />,
  },
  {
    label: "风格",
    children: <Style />,
  },
  {
    label: "皮肤",
    children: <Skin />,
  },
  {
    label: "符号",
    children: <Punctuation />,
  },
  {
    label: "自定义短语",
    children: <CustomPhrase />,
  },
  {
    label: "其他",
    children: <Other />,
  },
]

const Home = () => {
  const navigate = useNavigate()

  return (
    <>
      <Tabs
        centered={true}
        style={{ height: "100%", minHeight: "100vh", backgroundColor: "#f3f3f3" }}
        items={items.map((item) => {
          return {
            ...item,
            key: item.label,
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
