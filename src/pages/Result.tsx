import { Button, Switch, Tabs } from "antd"
import React, { useEffect, useState } from "react"
import useSchemaState from "../store/SchemaStore"
import useDefaultState from "../store/DefaultStore"
import useWeaselStyleState from "../store/WeaselStyleStore"
import useRimeLuaState from "../store/RimeLuaStore"
import useCustomPhrase from "../store/CustomPhraseStore"
import { useNavigate } from "react-router-dom"

import SyntaxHighlighter from "react-syntax-highlighter"
import { monokaiSublime } from "react-syntax-highlighter/dist/esm/styles/hljs"

import download from "../utils/DownloadUtils"
import useSquirrelStore from "./theme/squirrel/SquirrelStore"

const hlighter = (content: string, language: "yaml" | "lua" | "txt") => (
  <SyntaxHighlighter language={language} style={monokaiSublime}>
    {content}
  </SyntaxHighlighter>
)

interface SimpleDictProps {
  content: string
}
const SimpleDict: React.FC<SimpleDictProps> = ({ content = "" }) => {
  const [displayAll, changeDisplay] = useState(false)

  if (displayAll) {
    return <>{content}</>
  } else {
    return (
      <>
        {hlighter(content.split("\n").slice(0, 200).join("\n"), "yaml")}
        <Switch
          unCheckedChildren="完全显示"
          checkedChildren="完全显示"
          onChange={(checked: boolean) => {
            changeDisplay(checked)
          }}
        />
      </>
    )
  }
}

const rimeName = () => {
  const userAgent = navigator.userAgent

  if (userAgent.indexOf("Win") !== -1) {
    return "weasel.custom.yaml"
  } else if (userAgent.indexOf("Mac") !== -1) {
    return "squirrel.custom.yaml"
  }

  return "?.custom.yaml"
}

const Result: React.FC = () => {
  const navigate = useNavigate()

  const defaultState = useDefaultState()
  const defaultCustom = defaultState.generateYAML()
  const { url, dictFileName, schemaFileName } = defaultState.needDownload()

  const styleFileName = rimeName()
  const weaselState = useWeaselStyleState()
  const squirrelState = useSquirrelStore()
  const styleCustom = styleFileName === "weasel.custom.yaml" ? weaselState.generateYAML() : squirrelState.generateYAML()

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

  const candidates = [
    { condition: defaultCustom, filename: "default.custom.yaml", key: "defaultCustom", content: defaultCustom },
    { condition: styleCustom, filename: styleFileName, key: "styleCustom", content: styleCustom },
    { condition: schemaCustom, filename: schemaState.fileName, key: "schemaCustom", content: schemaCustom },
    { condition: schemaFileName, filename: schemaFileName, key: "schema", content: schema },
    { condition: dictFileName, filename: dictFileName, key: "dict", content: dict },
    { condition: luaContent, filename: "rime.lua", key: "rime.lua", content: luaContent },
    { condition: phraseContent, filename: "custom_phrase.txt", key: "custom_phrase.txt", content: phraseContent },
  ]

  const items = candidates
    .filter((candidate) => candidate.condition)
    .map(({ filename, key, content }) => {
      const dict = key === "dict"
      const yaml = !dict && filename?.endsWith(".yaml")
      const lua = filename?.endsWith(".lua")
      const txt = filename?.endsWith(".txt")

      return {
        filename,
        key,
        content: dict
          ? SimpleDict({ content: content! })
          : yaml
          ? hlighter(content!, "yaml")
          : lua
          ? hlighter(content!, "lua")
          : txt
          ? hlighter(content!, "txt")
          : content,
      }
    })
    .map(({ filename, key, content }) => {
      return {
        label: filename,
        key,
        children: (
          <div
            style={{
              wordSpacing: "6px",
              height: "80vh",
              overflowY: "auto",
            }}
          >
            {content}
          </div>
        ),
      }
    })

  let content = (
    <Tabs
      style={{ padding: "0vh 10vw" }}
      type="card"
      items={items}
      tabBarExtraContent={{
        right: (
          <Button
            type="primary"
            onClick={() => {
              const files = candidates
                .filter((candidate) => candidate.condition)
                .map(({ filename, content }) => ({
                  filename: filename as string,
                  content: content as string,
                }))
              download(files)
            }}
          >
            Download
          </Button>
        ),
      }}
    />
  )

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
        style={{ alignSelf: "start", margin: "0 10vw" }}
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
