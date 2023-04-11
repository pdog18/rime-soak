import React, { useState } from "react"
import RimeSettingItem from "../../components/RimeSettingItem"
import { ClusterOutlined as InputTypeIcon } from "@ant-design/icons"

import useCustomPhrase from "../../store/CustomPhraseStore"
import { Input, Button, Switch, Space, Select, Tooltip } from "antd"
import useSchemaState from "../../store/SchemaStore"

function isAllLowerCase(input: string): boolean {
  return /^[a-z]+$/.test(input)
}

const CustomPhrase: React.FC = () => {
  const customPhraseState = useCustomPhrase()
  const schemaState = useSchemaState()

  const initInput = {
    shortcut: "",
    phrase: "",
    weight: 3,
  }

  const [newCustomPhrase, setNewCustomPhrase] = useState(initInput)

  const [shortcutHint, changeShortcutHint] = useState({
    title: "空格已被删除",
    show: false,
  })
  const [phraseHint, changePhraseHint] = useState(false)
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
            <Tooltip trigger={[]} title={shortcutHint.title} open={shortcutHint.show}>
              <Input
                placeholder="例: msd"
                value={newCustomPhrase.shortcut}
                style={{ width: "100px" }}
                onChange={(event) => {
                  const shortcut = event.target.value
                  const show = shortcut.trim().length !== 0 && !isAllLowerCase(shortcut.trim())

                  changeShortcutHint({
                    title: "只能输入小写字母",
                    show,
                  })

                  setNewCustomPhrase({
                    ...newCustomPhrase,
                    shortcut: event.target.value,
                  })
                }}
              />
            </Tooltip>
            短语:
            <Tooltip trigger={[]} title="空格已被删除" open={phraseHint}>
              <Input
                placeholder="例: 马上到"
                style={{ width: "120px" }}
                value={newCustomPhrase.phrase}
                onChange={(event) => {
                  setNewCustomPhrase({
                    ...newCustomPhrase,
                    phrase: event.target.value,
                  })
                }}
              />
            </Tooltip>
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

                changeShortcutHint({
                  title: "空格已被移除",
                  show: shortcut.trim().length !== shortcut.length,
                })
                changePhraseHint(phrase.trim().length !== phrase.length)

                customPhraseState.addPhrase(shortcut.trim(), phrase.trim(), weight)
                setNewCustomPhrase(initInput)
              }}
            >
              添加
            </Button>
          </Space>
        )}

        {customPhraseState.enable && customPhraseState.phrases.length > 0 && (
          <div style={{ padding: "16px 16px", background: "white" }}>
            <div style={{ ...itemStyle, borderBottom: "0.05rem dashed " }}>
              <div>输入码</div>
              <div>短语</div>
              <div>优先级</div>
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
