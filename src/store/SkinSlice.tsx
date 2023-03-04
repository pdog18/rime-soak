import { createSlice } from "@reduxjs/toolkit"

const skin = {}

const rimeSlice = createSlice({
  name: "rime",
  initialState: skin,
  reducers: {
    xxx: (state, actions) => {},
    xxxd: (state, actions) => {},
  },
})

export const { xxx, xxxd } = rimeSlice.actions
export default rimeSlice
