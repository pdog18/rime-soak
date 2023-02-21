import { createSlice } from '@reduxjs/toolkit'
import json from './punctuation.json'

type PunctuType = {
  key: string
  name: string
  full_shape: any
  half_shape: any
  ascii_style: any
}

const data: PunctuType[] = []

// json to table's array, forEach by [ascii_style]
// 注意：这里使用的是 [ascii_sytle] ，所以遍历时，没有[space]参与
// 如果有需要编辑 [space] 的需求，那么可以改成 [full_shape] 进行遍历
Object.keys(json.ascii_style).forEach((key, index) => {
  data.push({
    key: `key:${key} ${index}`,
    name: key,
    full_shape: (json.full_shape as any)[key],
    half_shape: (json.half_shape as any)[key],
    ascii_style: (json.ascii_style as any)[key]
  })
})

const punctuSlice = createSlice({
  name: 'punctu',
  initialState: data,
  reducers: {
    onPunctuationChange: (state, actions) => {
      console.log(state);
    },
    punctu2: (state, actions) => {

    },
  }
})

export const { onPunctuationChange, punctu2 } = punctuSlice.actions;
export default punctuSlice;
export type { PunctuType } 