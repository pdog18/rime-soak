import { Tabs } from "antd"
import React, { useEffect, useState } from "react"
import useSchemaState from "../store/SchemaStore"
import useDefaultState from "../store/DefaultStore"
import useStyleState from "../store/StyleStore"

const user = "rime"
const repo = "rime-pinyin-simp"
const branch = "master"
const dictFileName = "pinyin_simp.dict.yaml"
const schemaFileName = "pinyin_simp.schema.yaml"

const Result: React.FC = () => {
  const defaultCustom = useDefaultState().generateYAML()

  const styleState = useStyleState()
  const styleCustom = styleState.generateYAML()

  const schemaState = useSchemaState()
  const schemaCustom = schemaState.generateYAML()

  const [schema, setSchema] = useState<string>()
  const [dict, setDict] = useState<string>()

  useEffect(() => {
    async function fetchSchema() {
      const dictResponse = await fetch(`https://raw.githubusercontent.com/${user}/${repo}/${branch}/${dictFileName}`)
      const schemaRespone = await fetch(`https://raw.githubusercontent.com/${user}/${repo}/${branch}/${schemaFileName}`)
      const dictData = await dictResponse.text()
      const schemaData = await schemaRespone.text()

      setSchema(schemaData)
      setDict(dictData)
    }
    fetchSchema()
  }, [])

  // todo 袖珍拼音/双拼／五笔等方案，Rime 未自带，需要额外安装，拖入 Rime 文件夹直接安装
  // 拖入后，备份相关文件

  const candidates = [
    { condition: defaultCustom, label: "default.custom.yaml", key: "defaultCustom", content: defaultCustom },
    { condition: styleCustom, label: styleState.fileName, key: "styleCustom", content: styleCustom },
    { condition: schemaCustom, label: schemaState.fileName, key: "schemaCustom", content: schemaCustom },
    { condition: schema, label: schemaFileName, key: schemaFileName, content: schema },
    {
      condition: dict,
      label: dictFileName,
      key: dictFileName,
      content: (
        <details>
          <summary>点击展开 dict</summary>
          {dict}
        </details>
      ),
    },
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
            }}
          >
            {content}
          </div>
        ),
      }
    })

  return <Tabs type="card" items={items} />
}

export default Result
