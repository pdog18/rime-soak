import { createSlice } from '@reduxjs/toolkit'

const basic = {
  horizontal: false,
  inline_preedit: false,
  menu: {
    page_size: 5
  },
  setting_changed: false
}

const basicSlice = createSlice({
  name: 'basic',
  initialState: basic,
  reducers: {
    changeOrientation: (state, actions) => {
      state.horizontal = actions.payload
      state.setting_changed = true
    },
    changePreedit: (state, actions) => {
      state.inline_preedit = actions.payload
      state.setting_changed = true
    },
    changePageSize: (state, actions) => {
      state.menu.page_size = actions.payload
      state.setting_changed = true
    },
    saveBasicSetting: (state) => {
      console.log('save');
    },
  }
})

export const { changeOrientation, changePreedit, changePageSize, saveBasicSetting } = basicSlice.actions;
export default basicSlice;