import { FloatButton, Tabs } from "antd"

import Default from "./default/Default"
import Punctuation from "./punctuation/Punctuation"

import Style from "./style/Style"
import { useLocation, useNavigate } from "react-router-dom"
import Other from "./other/Other"
import CustomPhrase from "./customPhrase/CustomPhrase"
import WeaselCustomTheme from "./theme/weasel/CustomWeaselTheme"
import KeyBinder from "./keyBinder/KeyBinder"
import SquirrelPlayground from "./theme/squirrel/SquirrelPlayground"
import { useEffect, useState } from "react"
import useSquirrelStore from "./theme/squirrel/SquirrelStore"

const weasel = navigator.userAgent.indexOf("Win") !== -1

const items = [
  {
    key: "/",
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
    children: weasel ? <WeaselCustomTheme /> : <SquirrelPlayground />,
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
  const location = useLocation()
  const navigate = useNavigate()

  const [activeKey, changeActiveKey] = useState(() => sessionStorage.getItem("activeKey") ?? `${location.pathname}`)

  useEffect(() => {
    sessionStorage.setItem("activeKey", activeKey)
  }, [activeKey])

  const squirrelState = useSquirrelStore()

  return (
    <>
      <Tabs
        centered={true}
        activeKey={activeKey}
        style={{ height: "100%", minHeight: "100vh", backgroundColor: "#f3f3f3" }}
        onChange={(activeKey) => {
          changeActiveKey(activeKey)
        }}
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
          if (!weasel && activeKey === "/theme" && squirrelState.selectTheme === "none") {
            squirrelState.showToolTip(true)
            setTimeout(() => {
              squirrelState.showToolTip(false)
            }, 3000)
          } else {
            navigate("/result")
          }
        }}
      />
    </>
  )
}

export default Home
