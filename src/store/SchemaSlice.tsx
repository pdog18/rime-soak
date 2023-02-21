import { createSlice } from '@reduxjs/toolkit'

const schema = {
  simplified: false,
  inputMode: 'pinyin'
}

const schemaSlice = createSlice({
  name: 'schema',
  initialState: schema,
  reducers: {
    changeSimplified: (state, actions) => {
      state.simplified = actions.payload
    },
    changeInputMode: (state, actions) => {
      state.inputMode = actions.payload
    },
  }
})

export const { changeSimplified, changeInputMode } = schemaSlice.actions;
export default schemaSlice;