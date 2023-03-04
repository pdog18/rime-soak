import { createSlice } from "@reduxjs/toolkit"

const soak = {
  dropBeforeModify: true,
  droped: false,
}

const soakSlice = createSlice({
  name: "soak",
  initialState: soak,
  reducers: {
    changeMode: (state, actions) => {
      state.dropBeforeModify = actions.payload
    },
    changeDroped: (state, actions) => {
      state.droped = actions.payload
    },
  },
})

export const { changeMode, changeDroped } = soakSlice.actions
export default soakSlice
