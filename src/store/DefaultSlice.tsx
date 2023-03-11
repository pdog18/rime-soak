import { createSlice } from "@reduxjs/toolkit"

const initState = {
  defaultCustom: {
    customization: {
      distribution_code_name: "Weasel",
      distribution_version: "0.14.3_dev_0.8",
      generator: "Rime::SwitcherSettings",
      modified_time: "Mon Jan 30 22:32:13 2023",
      rime_version: "1.7.3",
    },
    patch: {
      "menu/page_size": 5,
      schema_list: [{ schema: "luna_pinyin_simp" }],
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
  },
})

export const { changePageSize, changeTargetSchema } = defaultSlice.actions
export default defaultSlice
