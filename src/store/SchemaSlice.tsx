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

const data = {
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
  setting_changed: false,
  punctuArray: punctuArray,
}

const initArray = (state: typeof data) => {
  Object.keys(json.ascii_style).forEach((key, index) => {
    state.punctuArray.push({
      key: `key:${key} ${index}`,
      name: key,
      index: index,
      full_shape: (json.full_shape as any)[key],
      half_shape: (json.half_shape as any)[key],
      ascii_style: (json.ascii_style as any)[key],
    })
  })
}
const punctuSlice = createSlice({
  name: "punctu",
  initialState: data,
  reducers: {
    initPunctuOrigin: (state) => {
      initArray(state)
    },
    initSchemaCustomFromFile: (state, actions) => {
      const content = actions.payload

      // todo : 需要处理 YAML 语法中的 / 无法正确识别为层级的情况

      const halfShape = content.patch["punctuator/half_shape"]
      const fullShape = content.patch["punctuator/full_shape"]
      const halfShapeArray = halfShape ? Object.entries(halfShape) : []
      const fullShapeArray = fullShape ? Object.entries(fullShape) : []

      // 1. content -> state.json
      state.schemaCustom = content
      // 2. 防止每次拖入文件夹丢失已有的配置
      fullShapeArray.forEach((e) => {
        const key = e[0]
        const newShape = e[1] as any
        ;(json.full_shape as any)[key] = newShape
      })
      halfShapeArray.forEach((e) => {
        const key = e[0]
        const newShape = e[1] as any
        ;(json.half_shape as any)[key] = newShape
      })

      /**
       * json to table's array, forEach by [ascii_style]
       * 注意：这里使用的是 [ascii_sytle] ，所以遍历中没有[space]
       * 如果有需要编辑 [space] 的需求，那么改成 [full_shape] 进行遍历
       */
      initArray(state)
      // 3. json.punctuator -> state.schemaCustom.patch
      state.schemaCustom.patch["punctuator/half_shape"] = json.half_shape
      state.schemaCustom.patch["punctuator/full_shape"] = json.full_shape
      state.schemaCustom.patch["punctuator/ascii_style"] = json.ascii_style

      console.log(json.half_shape)
      console.log(json.full_shape)
      console.log(json.ascii_style)
    },
    changeHalfShapePunctuation: (state, actions) => {
      state.setting_changed = true
      changeShape("half_shape", state, actions.payload.index, actions.payload.half_shape)
    },
    changeFullShapePunctuation: (state, actions) => {
      state.setting_changed = true
      changeShape("full_shape", state, actions.payload.index, actions.payload.full_shape)
    },
    savePunctuSetting: (state, actions) => {
      state.schemaCustom.customization.modified_time = new Date().toLocaleString()
    },
  },
})

const changeShape = (
  type: "half_shape" | "full_shape",
  state: WritableDraft<typeof data>,
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

export const {
  initSchemaCustomFromFile,
  initPunctuOrigin,
  changeFullShapePunctuation,
  changeHalfShapePunctuation,
  savePunctuSetting,
} = punctuSlice.actions
export default punctuSlice
export type { PunctuType }
