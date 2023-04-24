import { FloatButton, Tabs } from "antd"

import Default from "./default/Default"
import Punctuation from "./punctuation/Punctuation"

import Style from "./style/Style"
import { useLocation, useNavigate } from "react-router-dom"
import Other from "./other/Other"
import CustomPhrase from "./customPhrase/CustomPhrase"
import WeaselCustomTheme from "./theme/weasel/CustomWeaselTheme"
import KeyBinder from "./keyBinder/KeyBinder"
import SquirrelCustomTheme from "./theme/squirrel/SquirrelCustomTheme"

const items = [
  {
    key: "/default",
    label: "基本",
    children: <Default />,
  },
  {
    key: "/style",
    label: "风格",
    children: <Style />,
  },
  {
    key: "/theme",
    label: "皮肤",
    children: navigator.userAgent.indexOf("Win") !== -1 ? <WeaselCustomTheme /> : <SquirrelCustomTheme />,
  },
  {
    key: "/punctuation",
    label: "符号",
    children: <Punctuation />,
  },
  {
    key: "/custom-phrase",
    label: "自定义短语",
    children: <CustomPhrase />,
  },
  {
    key: "/key-binder",
    label: "按键",
    children: <KeyBinder />,
  },
  {
    key: "/others",
    label: "其他",
    children: <Other />,
  },
]

const Home = () => {
  console.log("custom skin > ", navigator.userAgent.indexOf("Win"))

  const location = useLocation()
  const navigate = useNavigate()

  const needChangeDefaultActive = items.filter((item) => item.key === location.pathname).length === 1

  const activeKey = needChangeDefaultActive ? location.pathname : "/default"
  // todo 如果依旧处于 Home 界面，手动输入 pathName 时需要重新渲染，这是 Tabs#defaultActiveKey 的问题，可能需要替换该组件
  return (
    <>
      <Tabs
        centered={true}
        defaultActiveKey={activeKey}
        style={{ height: "100%", minHeight: "100vh", backgroundColor: "#f3f3f3" }}
        items={items.map((item) => {
          return {
            ...item,
            key: item.key,
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
