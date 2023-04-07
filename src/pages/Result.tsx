import { Button, Tabs } from "antd"
import React, { useEffect, useState } from "react"
import useSchemaState from "../store/SchemaStore"
import useDefaultState from "../store/DefaultStore"
import useStyleState from "../store/StyleStore"
import useRimeLuaState from "../store/RimeLuaStore"
import useCustomPhrase from "../store/CustomPhraseStore"
import { useNavigate } from "react-router-dom"

const Result: React.FC = () => {
  const navigate = useNavigate()

  const defaultState = useDefaultState()
  const defaultCustom = defaultState.generateYAML()
  const { url, dictFileName, schemaFileName } = defaultState.needDownload()

  const styleState = useStyleState()
  const styleCustom = styleState.generateYAML()

  const schemaState = useSchemaState()
  const schemaCustom = schemaState.generateYAML()

  const rimeLuaState = useRimeLuaState()
  const luaContent = rimeLuaState.generateRimeLua()

  const customPhraseState = useCustomPhrase()
  const phraseContent = customPhraseState.generateCustomPhrase()

  const [schema, setSchema] = useState<string>()
  const [dict, setDict] = useState<string>()

  useEffect(() => {
    async function fetchSchema() {
      if (dictFileName) {
        const dictData = await (await fetch(`${url}${dictFileName}`)).text()
        setDict(dictData)
      }

      if (schemaFileName) {
        const schemaData = await (await fetch(`${url}${schemaFileName}`)).text()
        setSchema(schemaData)
      }
    }
    fetchSchema()
  }, [url, dictFileName, schemaFileName])

  // todo 袖珍拼音/双拼／五笔等方案，Rime 未自带，需要额外安装，拖入 Rime 文件夹直接安装
  // 拖入后，备份相关文件

  const candidates = [
    { condition: defaultCustom, label: "default.custom.yaml", key: "defaultCustom", content: defaultCustom },
    { condition: styleCustom, label: styleState.fileName, key: "styleCustom", content: styleCustom },
    { condition: schemaCustom, label: schemaState.fileName, key: "schemaCustom", content: schemaCustom },
    { condition: schemaFileName, label: schemaFileName, key: "schema", content: schema },
    {
      condition: dictFileName,
      label: dictFileName,
      key: "dict",
      content: (
        <details>
          <summary>点击展开 dict</summary>
          {dict}
        </details>
      ),
    },
    { condition: luaContent, label: "rime.lua", key: "rime.lua", content: luaContent },
    { condition: phraseContent, label: "custom_phrase.txt", key: "custom_phrase.txt", content: phraseContent },
  ]
  const items = candidates
    .filter((candidate) => candidate.condition)
    .map(({ label, key, content }) => {
      return {
        label,
        key,
        children: (
          <div
            style={{
              padding: "16px 32px",
              fontSize: "20px",
              wordSpacing: "6px",
              whiteSpace: "pre-wrap",
              height: "80vh",
              overflowY: "auto",
            }}
          >
            {content}
          </div>
        ),
      }
    })

  let content = <Tabs style={{ padding: "0vh 10vw" }} type="card" items={items} />

  if (items.length === 0) {
    content = (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          fontSize: "32px",
        }}
      >
        <p> 配置无任何修改</p>
      </div>
    )
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "start",
        flexDirection: "column",
        gap: "8px",
        marginTop: "8px",
        maxHeight: "100vh",
      }}
    >
      <Button
        style={{ alignSelf: "center" }}
        type="primary"
        onClick={() => {
          navigate("/")
        }}
      >
        返回
      </Button>
      {content}
    </div>
  )
}

export default Result
