import { createSlice } from '@reduxjs/toolkit'

const punctu = {

}

const punctuSlice = createSlice({
  name: 'punctu',
  initialState: punctu,
  reducers: {
    punctu1: (state, actions) => {

    },
    punctu2: (state, actions) => {

    },
  }
})

export const { punctu1, punctu2 } = punctuSlice.actions;
export default punctuSlice;