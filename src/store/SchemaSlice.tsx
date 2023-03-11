import { createSlice } from "@reduxjs/toolkit"
import { WritableDraft } from "immer/dist/internal"
import json from "./punctuation.json"

type PunctuType = {
  key: string
  name: string
  index: number
  full_shape: any
  half_shape: any
  ascii_style: any
}

const punctuArray: PunctuType[] = []

const initState = {
  schemaCustom: {
    customization: {
      distribution_code_name: "Weasel",
      distribution_version: "0.14.3_dev_0.8",
      generator: "Rime::SwitcherSettings",
      modified_time: "Mon Jan 30 22:32:13 2023",
      rime_version: "1.7.3",
    },
    patch: {
      "punctuator/half_shape": {},
      "punctuator/full_shape": {},
      "punctuator/ascii_style": {},
    },
  },
  fileName: "luna_pinyin_simp.schema.yaml",
  punctuArray: punctuArray,
}

Object.keys(json.ascii_style).forEach((key, index) => {
  initState.punctuArray.push({
    key: `key:${key} ${index}`,
    name: key,
    index: index,
    full_shape: (json.full_shape as any)[key],
    half_shape: (json.half_shape as any)[key],
    ascii_style: (json.ascii_style as any)[key],
  })
})

const schemaSlice = createSlice({
  name: "schema",
  initialState: initState,
  reducers: {
    changeHalfShapePunctuation: (state, actions) => {
      changeShape("half_shape", state, actions.payload.index, actions.payload.half_shape)
    },
    changeFullShapePunctuation: (state, actions) => {
      changeShape("full_shape", state, actions.payload.index, actions.payload.full_shape)
    },
    changeSchemaName: (state, actions) => {
      state.fileName = `${actions.payload}.custom.yaml`
    },
  },
})

const changeShape = (
  type: "half_shape" | "full_shape",
  state: WritableDraft<typeof initState>,
  index: number,
  newShpae: any
) => {
  const record = state.punctuArray.find((record) => record.index === index)
  if (record) {
    // ✅ CORRECT: This object is still wrapped in a Proxy, so we can "mutate" it
    record[type] = newShpae
    // 同时需要在这里修改 patch 中的 punctutor 属性，因为在 save 中是无法进行修改的。
    const patch = state.schemaCustom.patch[`punctuator/${type}`] as any
    patch[record.name] = newShpae
  }
}

export const { changeFullShapePunctuation, changeHalfShapePunctuation, changeSchemaName } = schemaSlice.actions
export default schemaSlice
export type { PunctuType }
