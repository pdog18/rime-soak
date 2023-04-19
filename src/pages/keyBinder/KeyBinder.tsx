import React, { useState } from "react"

// todo A-Za-z0-9
import optionJson from "./options.json"
import { Cascader } from "antd"
import KeyInput from "../../components/KeyInput"
import useDefaultState, { BinderRuler } from "../../store/DefaultStore"

interface Option {
  value: string | number
  label: string
  disabled?: boolean
  children?: Option[]
}

const options: Option[] = optionJson

interface BinderRulerItemProps {
  ruler: BinderRuler
  index: number
  onRulerChanged: (index: number, ruler: BinderRuler) => void
}

const BinderRulerItem = ({ ruler, index, onRulerChanged }: BinderRulerItemProps) => {
  const { when, accept, send, toggle, select } = ruler

  const [locked, changeLock] = useState(true)
  const [pressKey, changePressKey] = useState(true)

  const handleLocked = (checked: boolean) => {
    changeLock(checked)

    onRulerChanged(index, {
      ...ruler,
      enable: checked,
    })
  }

  const handAcceptChanged = (value: string) => {
    onRulerChanged(index, {
      ...ruler,
      accept: value,
      enable: locked,
    })
  }

  const handleWhenChanged = (value: string) => {
    onRulerChanged(index, {
      ...ruler,
      when: value,
      enable: locked,
    })
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "fit-content",
        gap: "16px",
        padding: "5px",
      }}
    >
      <select
        style={{ width: "100px" }}
        disabled={locked}
        defaultValue={when}
        onChange={(e) => {
          handleWhenChanged(e.target.value)
        }}
      >
        <option value="has_menu">有候选词时</option>
        <option value="paging">翻页时</option>
        <option value="composing">输入时</option>
        <option value="always">全域</option>
      </select>

      <KeyInput
        defaultValue={accept}
        disabled={locked}
        display={pressKey ? "block" : "none"}
        onChanged={(value) => {
          handAcceptChanged(value)
        }}
      />
      <input
        style={{ display: pressKey ? "none" : "block", width: "200px" }}
        type="text"
        value={accept}
        disabled={locked}
        onChange={(e) => {
          handAcceptChanged(e.target.value)
        }}
      />

      <input
        title="按键/填写"
        defaultChecked={pressKey}
        style={{ visibility: locked ? "hidden" : "visible" }}
        type="checkbox"
        onChange={(e) => {
          changePressKey(e.target.checked)
        }}
      />

      <Cascader
        options={options}
        disabled={locked}
        displayRender={(label) => label.join(" : ")}
        style={{ width: "230px" }}
        defaultValue={[
          `${send ? "send" : toggle ? "toggle" : select ? "select" : undefined}`,
          `${send ?? toggle ?? select}`,
        ]}
        onChange={(e) => {
          const optionName = e[0]
          const optionValue = e[1]
          onRulerChanged(index, {
            when: ruler.when,
            accept: ruler.accept,
            [optionName]: optionValue,
            enable: locked,
          })
        }}
      />

      <input title="锁定" defaultChecked={locked} type="checkbox" onChange={(e) => handleLocked(e.target.checked)} />
    </div>
  )
}

const KeyBinder: React.FC = () => {
  const state = useDefaultState()
  const bindings = state.defaultCustom.patch["key_binder/bindings"]
  const capsLockEnable = state.defaultCustom.patch["ascii_composer/good_old_caps_lock"]
  const changeCapsLock = state.changeCapsLock

  const changeKeyBinder = state.changeKeyBinder

  return (
    <div style={{ margin: "0 5vw", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ display: "inline-flex", alignItems: "center", marginBottom: "2vh", gap: "16px" }}>
        <input
          type="checkbox"
          style={{ zoom: "160%", fontSize: "18px" }}
          checked={!capsLockEnable}
          onChange={(e) => {
            console.log(e.target.checked)
            changeCapsLock(!e.target.checked)
          }}
        />
        <div>使用CapsLock 切换中英文</div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "fit-content",
          gap: "10px",
        }}
      >
        <div style={{ width: "110px" }}>何时有效</div>
        <div style={{ width: "250px" }}>输入按键</div>
        <div style={{ width: "230px" }}>期望行为</div>
        <div>启用</div>
      </div>
      <div>
        {bindings.map((item, index) => (
          <BinderRulerItem
            key={index}
            ruler={item}
            index={index}
            onRulerChanged={(changedIndex, newRuler) => {
              changeKeyBinder(
                bindings.map((v, index) => {
                  if (index === changedIndex) {
                    return newRuler
                  } else {
                    return v
                  }
                })
              )
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default KeyBinder
