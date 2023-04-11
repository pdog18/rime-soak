import React, { useState } from "react"
import RimeSettingItem from "../../components/RimeSettingItem"
import { ClusterOutlined as InputTypeIcon } from "@ant-design/icons"

import useCustomPhrase from "../../store/CustomPhraseStore"
import { Input, Button, Switch, Space, Select } from "antd"
import useSchemaState from "../../store/SchemaStore"

const CustomPhrase: React.FC = () => {
  const customPhraseState = useCustomPhrase()
  const schemaState = useSchemaState()

  const initInput = {
    shortcut: "",
    phrase: "",
    weight: 1000,
  }
  const [newCustomPhrase, setNewCustomPhrase] = useState(initInput)

  const itemStyle = {
    display: "grid",
    gridTemplateColumns: "200px 200px 60px",
    gridGap: "10px",
    background: "white",
  }

  return (
    <div style={{ height: "90vh", overflowY: "scroll" }}>
      <div
        style={{
          margin: "4vh 4vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <RimeSettingItem icon={<InputTypeIcon />} title="开启自定义短语">
          <Switch
            checked={customPhraseState.enable}
            onChange={(checked) => {
              customPhraseState.enableCustomPhrase(checked)
              schemaState.enableCustomPhrase(checked)
            }}
          />
        </RimeSettingItem>

        {customPhraseState.enable && (
          <Space wrap>
            输入码:
            <Input
              placeholder="例: msd"
              value={newCustomPhrase.shortcut}
              onChange={(event) => {
                setNewCustomPhrase({
                  ...newCustomPhrase,
                  shortcut: event.target.value,
                })
              }}
            />
            短语:
            <Input
              placeholder="例: 马上到"
              value={newCustomPhrase.phrase}
              onChange={(event) => {
                setNewCustomPhrase({
                  ...newCustomPhrase,
                  phrase: event.target.value,
                })
              }}
            />
            优先级:
            <Select
              defaultValue="3"
              style={{ width: 60 }}
              onChange={(value) => {
                setNewCustomPhrase({
                  ...newCustomPhrase,
                  weight: +value,
                })
              }}
              options={[
                { value: "3", label: "高" },
                { value: "2", label: "中" },
                { value: "1", label: "低" },
              ]}
            />
            <Button
              type="primary"
              disabled={newCustomPhrase.shortcut.length === 0 || newCustomPhrase.phrase.length === 0}
              onClick={() => {
                const { shortcut, phrase, weight } = newCustomPhrase
                customPhraseState.addPhrase(shortcut, phrase, weight)
                setNewCustomPhrase(initInput)
              }}
            >
              添加
            </Button>
          </Space>
        )}

        {customPhraseState.enable && customPhraseState.phrases.length > 0 && (
          <div style={{ padding: "16px 16px", background: "white" }}>
            <div style={itemStyle}>
              <div>输入码</div>
              <div>短语</div>
              <div>优先级</div>
            </div>
            <div>
              ---------------------------------------------------------------------------------------------------------------
            </div>

            {customPhraseState.phrases.map(({ phrase, shortcut, weight }) => {
              return (
                <div style={itemStyle} key={phrase + shortcut}>
                  <div>{shortcut}</div>
                  <div>{phrase}</div>
                  <div>{weight === 3 ? "高" : weight === 2 ? "中" : "低"}</div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default CustomPhrase
