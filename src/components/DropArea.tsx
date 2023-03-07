import { App, notification } from "antd"
import { Dispatch, useContext, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { AnyAction } from "redux"
import { parse as YAMLparse } from "yaml"
import { FolderOutlined } from "@ant-design/icons"
import { initDefaultFormDropDictory } from "../store/DefaultSlice"
import { initSchemaCustomFromFile } from "../store/SchemaSlice"
import { changeDroped } from "../store/SoakSlice"
import { RootState } from "../store/Store"
import { initStyleCustomFileName, initStyleFromDropDictory } from "../store/StyleSlice"
import FileSystemHandleContext from "../FileSystemHandleContext"
import OriginContext, { SoakDefault } from "../OriginContext"

// todo 如果 drop 了一个刚好叫 Rime 的文件夹，并且不是正確的「用户文件夹」，此时应该即使报错
const onDrop = async (
  state: RootState,
  dispatch: Dispatch<AnyAction>,
  rime: FileSystemDirectoryHandle,
  setSoakDefault: (entry: SoakDefault) => void
) => {
  // 1. 先确认文件夹中是否有 default.custom.yaml 以及  "weasel/squirrel.custom.yaml":
  let defaultCustomFileExist = false
  let styleCustomFileExist = false
  let otherCustomFiles = []
  const soakOrigin: SoakDefault = {
    soakDefault: state.defaultCustom,
    soakSchema: state.schema,
    soakStyle: state.rimeCustom,
  }

  for await (const entry of rime.values()) {
    if (entry instanceof FileSystemFileHandle) {
      // 刚开始安装时，Rime 文件夹中只有 user.yaml, installation.yaml, luna_pinyin.userdb, build
      // 如果是 init 那么去读取 build 文件夹内的 default.yaml 与 weasel/squirrel.yaml 可能更合适
      switch (entry.name) {
        case "default.custom.yaml":
          console.log(">>>>>default.custom.yaml")
          defaultCustomFileExist = true
          const defaultJSON = YAMLparse(await (await entry.getFile()).text())
          soakOrigin.soakDefault = defaultJSON
          dispatch(initDefaultFormDropDictory(defaultJSON))
          continue
        case "weasel.custom.yaml":
        case "squirrel.custom.yaml":
          styleCustomFileExist = true

          dispatch(initStyleCustomFileName(entry.name))
          const styleJSON = YAMLparse(await (await entry.getFile()).text())
          soakOrigin.soakStyle = styleJSON
          dispatch(initStyleFromDropDictory(styleJSON))
          continue
        case "installation.yaml":
          const installationContent = await (await entry.getFile()).text()
          const obj = YAMLparse(installationContent)
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
  switch (otherCustomFiles.length) {
    case 0:
      console.log("已拖入 Rime 文件夹，但是没有 ?schema.custom.yaml 文件")
      break
    case 1:
      const schemaJSON = YAMLparse(await (await otherCustomFiles[0].getFile()).text())
      soakOrigin.soakSchema = schemaJSON
      dispatch(initSchemaCustomFromFile(schemaJSON))
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

  setSoakDefault(soakOrigin)
  dispatch(changeDroped(true))
}

const DropArea = () => {
  const { notification } = App.useApp()
  const dispatch = useDispatch()
  const state = useSelector((state: RootState) => state)
  const navigate = useNavigate()

  useEffect(() => {
    if (state.soak.droped) {
      notification.success({ message: "成功接收 Rime 文件夹" })
      navigate("/home")
    }
  }, [state.soak.droped, notification, navigate])

  const { handle: contextHandle, setHandle } = useContext(FileSystemHandleContext)

  const { setSoakDefault } = useContext(OriginContext)
  console.log(contextHandle)
  console.log(setHandle)

  useEffect(() => {
    console.log("contextHandle", contextHandle)
  }, [contextHandle])

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "1px dashed #c0c0c0",
        width: "30vw",
        height: "18vw",
        minWidth: "300px",
        minHeight: "180px",
        borderRadius: "8px",
        background: "rgb(248,249,250)",
        textAlign: "center",
        fontSize: "16px",
        lineHeight: "30px",
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
        setHandle(handle)
        onDrop(state, dispatch, handle, setSoakDefault!)
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
      <FolderOutlined style={{ fontSize: "24px", padding: "16px" }} /> 将 Rime 文件夹放到此处
    </div>
  )
}

export default DropArea
