import { App, notification } from "antd"
import { Dispatch, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { AnyAction } from "redux"
import { parse } from "yaml"
import { initDefaultCustomFile } from "../store/DefaultSlice"
import { initSchemaCustomFromFile } from "../store/PunctuSlice"
import { changeDroped } from "../store/SoakSlice"
import { RootState } from "../store/Store"
import { initStyleCustomFileName, initStyleCustomFromFile } from "../store/StyleSlice"

// todo 如果 drop 了一个刚好叫 Rime 的文件夹，并且不是正確的「用户文件夹」，此时应该即使报错
const onDrop = async (dispatch: Dispatch<AnyAction>, rime: FileSystemDirectoryHandle) => {
  // 1. 先确认文件夹中是否有 default.custom.yaml 以及  "weasel/squirrel.custom.yaml":
  let defaultCustomFileExist = false
  let styleCustomFileExist = false
  let otherCustomFiles = []

  for await (const entry of rime.values()) {
    if (entry instanceof FileSystemFileHandle) {
      // 刚开始安装时，Rime 文件夹中只有 user.yaml, installation.yaml, luna_pinyin.userdb, build
      // 如果是 init 那么去读取 build 文件夹内的 default.yaml 与 weasel/squirrel.yaml 可能更合适
      switch (entry.name) {
        case "default.custom.yaml":
          console.log(">>>>>default.custom.yaml")
          defaultCustomFileExist = true
          const defaultContent = await (await entry.getFile()).text()
          dispatch(
            initDefaultCustomFile({
              hd: rime,
              json: parse(defaultContent),
            })
          )
          continue
        case "weasel.custom.yaml":
        case "squirrel.custom.yaml":
          styleCustomFileExist = true

          dispatch(initStyleCustomFileName(entry.name))
          const styleContent = await (await entry.getFile()).text()
          dispatch(
            initStyleCustomFromFile({
              hd: rime,
              json: parse(styleContent),
            })
          )
          continue
        case "installation.yaml":
          const installationContent = await (await entry.getFile()).text()
          const obj = parse(installationContent)
          const name = obj.distribution_code_name as string
          dispatch(initStyleCustomFileName(`${name.toLowerCase()}.custom.yaml`))
          continue
        default:
          if (entry.name.endsWith(".custom.yaml")) {
            otherCustomFiles.push(entry)
            console.log("push")
          }
          continue
      }
    }
  }

  // 刚安装 Rime
  if (!defaultCustomFileExist) {
    dispatch(
      initDefaultCustomFile({
        hd: rime,
        json: null,
      })
    )
  }

  if (!styleCustomFileExist) {
    dispatch(
      initStyleCustomFromFile({
        hd: rime,
        json: null,
      })
    )
  }

  switch (otherCustomFiles.length) {
    case 0:
      dispatch(
        initSchemaCustomFromFile({
          hd: rime,
          json: null,
        })
      )
      break
    case 1:
      const schemaCustomContent = await (await otherCustomFiles[0].getFile()).text()
      dispatch(
        initSchemaCustomFromFile({
          hd: rime,
          json: parse(schemaCustomContent),
        })
      )
      break
    // todo 如果 Rime 下有多个方案，需要看现在是哪个 schema，再确认方案
    default:
      const entryNames = otherCustomFiles.map((entry) => {
        return `[${entry.name}]`
      })
      notification.info({
        message: "无法确定标点对应的方案",
        description: `Rime 中有这些方案：${entryNames},能否删除不使用的方案对应的 .custom.yaml?`,
      })
      break
  }

  dispatch(changeDroped(true))
}

const DropArea = () => {
  const { notification } = App.useApp()
  const dispatch = useDispatch()
  const soak = useSelector((state: RootState) => state.soak)
  const navigate = useNavigate()

  useEffect(() => {
    if (soak.droped) {
      notification.success({ message: "接收 Rime 文件夹成功" })
      navigate("/home")
    }
  }, [soak.droped, notification, navigate])

  return (
    <div
      style={{
        border: "2px dotted gray",
        width: "300px",
        height: "220px",
        borderRadius: "16px",
        background: "#dddddd",
        lineHeight: "220px",
        textAlign: "center",
      }}
      onDrop={async (e) => {
        e.preventDefault()
        e.stopPropagation()

        let items = e.dataTransfer.items
        if (items.length > 1) console.log("只能上传一个文件")
        if (items.length === 0) console.log("items.length === 0")

        const handle = await items[0].getAsFileSystemHandle()

        if (!(handle instanceof FileSystemDirectoryHandle)) {
          notification.error({ message: "文件类型不符", description: "需要 Rime 文件夹" })
          return
        }
        if (handle?.name !== "Rime") {
          notification.error({ message: "文件名不符", description: "需要 Rime 文件夹" })
          return
        }
        onDrop(dispatch, handle)
      }}
      onDragOver={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
      onDragEnter={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
      onDragLeave={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
    >
      将 「用户文件夹」Rime 拖入此处
    </div>
  )
}

export default DropArea
