import { createSlice } from '@reduxjs/toolkit'

type BasicType = {
  horizontal: boolean
  inline_preedit: boolean
  menu: {
    page_size: number
  }
}

const basic: BasicType = {
  horizontal: false,
  inline_preedit: false,
  menu: {
    page_size: 5
  }
}

type WrapType = {
  basic: BasicType
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

      console.log('menu size ',  state.menu.page_size);
      
    },

  }
})

export type { BasicType, WrapType }
export const { changeOrientation, changePreedit, changePageSize } = basicSlice.actions;
export default basicSlice;