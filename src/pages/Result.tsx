import { useSelector } from "react-redux"
import { stringify } from "yaml"
import { RootState } from "../store/Store"
import { Tabs } from "antd"
import React, { CSSProperties } from "react"

const Result: React.FC = () => {
  const rootState = useSelector((state: RootState) => state)
  const defaultCustom = stringify(rootState.default.defaultCustom)
  const styleCustom = stringify(rootState.style.styleCustom)
  const schemaCustom = stringify(rootState.schema.schemaCustom)

  // todo 袖珍拼音/双拼／五笔等方案，Rime 未自带，需要额外安装，拖入 Rime 文件夹直接安装
  // 拖入后，备份相关文件
  const styles: CSSProperties = {
    padding: "16px 32px",
    fontSize: "20px",
    wordSpacing: "6px",
    whiteSpace: "pre-wrap",
  }

  return (
    <Tabs
      type="card"
      items={[
        {
          label: `default.custom.yaml`,
          key: "defaultCustom",
          children: <div style={styles}>{defaultCustom}</div>,
        },
        {
          label: `${rootState.style.fileName}`,
          key: "styleCustom",
          children: <div style={styles}>{styleCustom}</div>,
        },
        {
          label: `${rootState.schema.fileName}`,
          key: "schemaCustom",
          children: <div style={styles}>{schemaCustom}</div>,
        },
      ]}
    />
  )
}

export default Result
