import { createSlice } from '@reduxjs/toolkit'

const skin = {

}


const skinSlice = createSlice({
  name: 'skin',
  initialState: skin,
  reducers: {
    xxx: (state, actions) => {

    },
    xxxd: (state, actions) => {

    },
  }
})

export const { xxx, xxxd } = skinSlice.actions;
export default skinSlice;