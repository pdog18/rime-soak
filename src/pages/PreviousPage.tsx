import { Button } from "antd"

import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import DropArea from "../components/DropArea"
import { changeMode } from "../store/SoakSlice"

const PreviousPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <>
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "60px",
        }}
      >
        <DropArea />

        <a href="https://github.com/pdog18/soak#Why" target="_blank" rel="noreferrer">
          为什么需要 Rime 文件夹？
        </a>
        <Button
          type="primary"
          size="large"
          onClick={() => {
            navigate("home")
            dispatch(changeMode(false))
          }}
        >
          跳过
        </Button>
      </div>
    </>
  )
}

export default PreviousPage
