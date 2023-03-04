import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createNewYAML } from "./YAMLUtils"

const defaultCustom = {
  default: {
    customization: {
      distribution_code_name: "Weasel",
      distribution_version: "0.14.3_dev_0.8",
      generator: "Rime::SwitcherSettings",
      modified_time: "Mon Jan 30 22:32:13 2023",
      rime_version: "1.7.3",
    },
    patch: {
      "menu/page_size": 5,
      schema_list: [{ schema: "luna_pinyin" }],
    },
  },
  schema: {
    simplified: false,
    inputMode: "pinyin",
  },
  default_setting_changed: false,
}

let handle: FileSystemDirectoryHandle

const defaultSlice = createSlice({
  name: "default",
  initialState: defaultCustom,
  reducers: {
    initDefaultCustomFile: (state, actions) => {
      const { hd, json } = actions.payload

      handle = hd
      const defaultCustomYAMLExist = !!json
      if (defaultCustomYAMLExist) {
        state.default = json
      }
    },

    changePageSize: (state, actions) => {
      // todo 需要想办法识别这种 / 语法
      state.default.patch["menu/page_size"] = actions.payload
      state.default_setting_changed = true
    },
    changeSimplified: (state, actions) => {
      state.default_setting_changed = true
      state.schema.simplified = actions.payload
      state.default.patch.schema_list = [
        indexSchema(`${state.schema.simplified}`, state.schema.inputMode as "double_pinyin" | "wubi" | "pinyin"),
      ]
    },
    changeInputMode: (state, actions) => {
      state.default_setting_changed = true
      state.schema.inputMode = actions.payload
      state.default.patch.schema_list = [
        indexSchema(`${state.schema.simplified}`, state.schema.inputMode as "double_pinyin" | "wubi" | "pinyin"),
      ]
    },
    saveDefaultSetting: (state) => {
      createNewYAML(state.default, "default.custom.yaml", handle)
    },
  },
})

function indexSchema(simplified: "true" | "false", schema: "double_pinyin" | "wubi" | "pinyin") {
  const schema_array = {
    false: {
      double_pinyin: "double_pinyin",
      wubi: "wubi_trad",
      pinyin: "luna_pinyin",
    },
    true: {
      double_pinyin: "double_pinyin", // todo 目前没有简体双拼
      wubi: "wubi86",
      pinyin: "pinyin_simp", // 袖珍拼音的词库比 luna 好
    },
  }

  return { schema: schema_array[simplified][schema] }
}

export const {
  changePageSize,
  initDefaultCustomFile,

  changeSimplified,
  changeInputMode,
  saveDefaultSetting,
} = defaultSlice.actions
export default defaultSlice
