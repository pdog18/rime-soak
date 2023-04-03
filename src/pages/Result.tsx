import { stringify } from "yaml"

import { Tabs } from "antd"
import React, { CSSProperties, useEffect, useState } from "react"
import useSchemaState, { SchemaState } from "../store/SchemaStore"
import useDefaultState from "../store/DefaultStore"
import useStyleState from "../store/StyleStore"

const user = "rime"
const repo = "rime-pinyin-simp"
const branch = "master"
const dictFileName = "pinyin_simp.dict.yaml"
const schemaFileName = "pinyin_simp.schema.yaml"

const Result: React.FC = () => {
  const styleState = useStyleState()
  const defaultCustom = stringify(useDefaultState().defaultCustom)
  const styleCustom = stringify(styleState.styleCustom)
  const schemaState = useSchemaState<SchemaState>((state) => state)
  const schemaCustom = stringify(schemaState.schema)

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
  const styles: CSSProperties = {
    padding: "16px 32px",
    fontSize: "20px",
    wordSpacing: "6px",
    whiteSpace: "pre-wrap",
  }

  const items = [
    {
      label: `default.custom.yaml`,
      key: "defaultCustom",
      children: <div style={styles}>{defaultCustom}</div>,
    },
    {
      label: `${styleState.fileName}`,
      key: "styleCustom",
      children: <div style={styles}>{styleCustom}</div>,
    },
    {
      label: `${schemaState.fileName}`,
      key: "schemaCustom",
      children: <div style={styles}>{schemaCustom}</div>,
    },
  ]

  schema &&
    items.push({
      label: schemaFileName,
      key: schemaFileName,
      children: <div style={styles}>{schema}</div>,
    })

  dict &&
    items.push({
      label: dictFileName,
      key: dictFileName,
      children: (
        <div style={styles}>
          <details>
            <summary>点击展开 dict</summary>
            {dict}
          </details>
        </div>
      ),
    })

  return <Tabs type="card" items={items} />
}

export default Result
