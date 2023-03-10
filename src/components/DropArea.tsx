import { App } from "antd"
import { Button, Modal } from "antd"
import { useContext, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { parse as YAMLparse } from "yaml"
import { FolderOutlined } from "@ant-design/icons"
import { initDefaultFormDropDictory } from "../store/DefaultSlice"
import { initSchemaCustomFromFile, setSchemaCustomFileNames } from "../store/SchemaSlice"
import { changeDroped } from "../store/SoakSlice"
import { RootState } from "../store/Store"
import { initStyleCustomFileName, initStyleFromDropDictory } from "../store/StyleSlice"
import FileSystemHandleContext from "../FileSystemHandleContext"
import ShapShotContext, { SoakSnapshot } from "../OriginContext"

// todo 如果 drop 了一个刚好叫 Rime 的文件夹，并且不是正確的「用户文件夹」，此时应该即使报错

const DropArea = () => {
  const { notification } = App.useApp()
  const dispatch = useDispatch()
  const state = useSelector((state: RootState) => state)
  const navigate = useNavigate()
  const { setHandle } = useContext(FileSystemHandleContext)
  const { setSoakDefault } = useContext(ShapShotContext)

  useEffect(() => {
    if (state.soak.droped) {
      notification.success({ message: "成功接收 Rime 文件夹" })
      navigate("/home")
    }
  }, [state.soak.droped, notification, navigate])

  const onDrop = async (rime: FileSystemDirectoryHandle) => {
    // 在这里使用 Soak 默认值，当拖入的 Rime 文件夹中没有对应文件，使用的就会是 Soak 的默认值
    const soakOrigin: SoakSnapshot = {
      soakDefault: state.default,
      soakSchema: state.schema,
      soakStyle: state.style,
    }

    let schemaCustomYAMLs: FileSystemFileHandle[] = []
    for await (const entry of rime.values()) {
      if (!(entry instanceof FileSystemFileHandle)) {
        continue
      }
      // 刚开始安装时，Rime 文件夹中只有 user.yaml, installation.yaml, luna_pinyin.userdb, build
      // 如果是 init 那么去读取 build 文件夹内的 default.yaml 与 weasel/squirrel.yaml 可能更合适
      switch (entry.name) {
        case "default.custom.yaml":
          const defaultJSON = YAMLparse(await (await entry.getFile()).text())
          soakOrigin.soakDefault = defaultJSON
          dispatch(initDefaultFormDropDictory(defaultJSON))
          continue
        case "weasel.custom.yaml":
        case "squirrel.custom.yaml":
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
            schemaCustomYAMLs.push(entry)
          }
          continue
      }
    }

    // todo 预防一种 case：Rime 存在某个 schema.custom.yaml 但是与新选择的 schema 不符
    switch (schemaCustomYAMLs.length) {
      // 刚安装 Rime
      case 0:
        console.log("已拖入 Rime 文件夹，但是没有 ?schema.custom.yaml 文件")
        dispatch(setSchemaCustomFileNames([]))
        break
      case 1:
        const file = await schemaCustomYAMLs[0].getFile()
        const schemaJSON = YAMLparse(await file.text())
        soakOrigin.soakSchema = schemaJSON
        dispatch(initSchemaCustomFromFile(schemaJSON))
        dispatch(setSchemaCustomFileNames([file.name]))
        break
      default:
        const schemaJSON_ = YAMLparse(await (await schemaCustomYAMLs[0].getFile()).text())
        soakOrigin.soakSchema = schemaJSON_
        dispatch(initSchemaCustomFromFile(schemaJSON))
        Modal.success({
          title: "选择你正在使用的 Schema.",
          content: (
            <>
              {schemaCustomYAMLs.map((entry) => {
                return (
                  <Button
                    style={{
                      margin: "4px 16px",
                      width: "180px",
                    }}
                    onClick={() => {
                      Modal.destroyAll()
                      dispatch(setSchemaCustomFileNames([entry.name]))
                    }}
                  >
                    {entry.name}
                  </Button>
                )
              })}
            </>
          ),
          okText: "我是新手(全选)",
          onOk: () => {
            const names = schemaCustomYAMLs.map((entry) => {
              return entry.name
            })
            dispatch(setSchemaCustomFileNames(names))
          },
        })
        break
    }

    setSoakDefault!(soakOrigin)
    dispatch(changeDroped(true))
  }

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
        onDrop(handle)
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
