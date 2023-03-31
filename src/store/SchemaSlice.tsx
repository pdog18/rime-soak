import { createSlice } from "@reduxjs/toolkit"

const initState = {
  schemaCustom: {
    patch: {},
  },
  fileName: "luna_pinyin_simp.custom.yaml",
}

const schemaSlice = createSlice({
  name: "schema",
  initialState: initState,
  reducers: {
    changeHalfShapePunctuation: (state, actions) => {},
    changeFullShapePunctuation: (state, actions) => {},
    changeSchemaName: (state, actions) => {
      state.fileName = `${actions.payload}.custom.yaml`
    },
  },
})

export const { changeFullShapePunctuation, changeHalfShapePunctuation, changeSchemaName } = schemaSlice.actions
export default schemaSlice
