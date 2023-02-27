import { createSlice } from '@reduxjs/toolkit'
import json from './punctuation.json'

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
  setting_changed: false,
  punctuArray: punctuArray
}

/**
 * json to table's array, forEach by [ascii_style]
 * 注意：这里使用的是 [ascii_sytle] ，所以遍历中没有[space]
 * 如果有需要编辑 [space] 的需求，那么改成 [full_shape] 进行遍历
 */
Object.keys(json.ascii_style).forEach((key, index) => {
  punctuArray.push({
    key: `key:${key} ${index}`,
    name: key,
    index: index,
    full_shape: (json.full_shape as any)[key],
    half_shape: (json.half_shape as any)[key],
    ascii_style: (json.ascii_style as any)[key]
  })
})

const punctuSlice = createSlice({
  name: 'punctu',
  initialState: data,
  reducers: {
    changeHalfShapePunctuation: (state, actions) => {
      state.setting_changed = true

      const record = state.punctuArray.find((record) => record.index === actions.payload.index)
      if (record) {
        // ✅ CORRECT: This object is still wrapped in a Proxy, so we can "mutate" it
        record.half_shape = actions.payload.half_shape
      }

    },
    changeFullShapePunctuation: (state, actions) => {
      state.setting_changed = true

      const record = state.punctuArray.find((record) => record.index === actions.payload.index)
      if (record) {
        // ✅ CORRECT: This object is still wrapped in a Proxy, so we can "mutate" it
        record.full_shape = actions.payload.full_shape
      }
    },
    savePunctuSetting: (state, actions) => {
      const schemaName = actions.payload
      console.log('savePunctuSetting');
    },
  }
})

export const { changeFullShapePunctuation, changeHalfShapePunctuation, savePunctuSetting } = punctuSlice.actions;
export default punctuSlice;
export type { PunctuType } 