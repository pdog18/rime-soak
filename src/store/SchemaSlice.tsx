import { createSlice } from '@reduxjs/toolkit'

const schema = {
  setting_changed: false,
  simplified: false,
  inputMode: 'pinyin'
}

const schemaSlice = createSlice({
  name: 'schema',
  initialState: schema,
  reducers: {
    changeSimplified: (state, actions) => {
      state.simplified = actions.payload
      state.setting_changed = true
    },
    changeInputMode: (state, actions) => {
      state.inputMode = actions.payload
      state.setting_changed = true
    },
    saveSchemaSetting: (state) => {
      console.log('schema');
    },
  }
})

export const { changeSimplified, changeInputMode, saveSchemaSetting } = schemaSlice.actions;
export default schemaSlice;