import { createSlice } from '@reduxjs/toolkit'

const basic = {
  horizontal: false,
  inline_preedit: false,
  menu: {
    page_size: 5
  }
}

const basicSlice = createSlice({
  name: 'basic',
  initialState: basic,
  reducers: {
    changeOrientation: (state, actions) => {
      state.horizontal = actions.payload
    },
    changePreedit: (state, actions) => {
      state.inline_preedit = actions.payload
    },
    changePageSize: (state, actions) => {
      state.menu.page_size = actions.payload      
    },
  }
})

export const { changeOrientation, changePreedit, changePageSize } = basicSlice.actions;
export default basicSlice;