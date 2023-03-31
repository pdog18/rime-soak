import { createSlice } from "@reduxjs/toolkit"

const initState = {
  defaultCustom: {
    patch: {
      "menu/page_size": 5,
      schema_list: [{ schema: "luna_pinyin_simp" }],
      "switcher/hotkeys": ["Control+grave", "Control+Shift+grave", "F4"],
    },
  },
}

const defaultSlice = createSlice({
  name: "default",
  initialState: initState,
  reducers: {
    changePageSize: (state, actions) => {
      state.defaultCustom.patch["menu/page_size"] = actions.payload
    },

    changeTargetSchema: (state, actions) => {
      state.defaultCustom.patch.schema_list = [{ schema: actions.payload }]
    },

    changeSwitcherHotkeys: (state, actions) => {
      state.defaultCustom.patch["switcher/hotkeys"] = actions.payload
    },
  },
})

export const { changePageSize, changeTargetSchema, changeSwitcherHotkeys } = defaultSlice.actions
export default defaultSlice
