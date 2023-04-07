import { create } from "zustand"
import produce from "immer"
import { stringify } from "yaml"

interface DefaultPatch {
  "menu/page_size": number
  schema_list: [{ schema: string }]
  "switcher/hotkeys": string[]
}
interface DownloadObject {
  url: string | null
  dictFileName: string | null
  schemaFileName: string | null
}

interface DefaultState {
  defaultCustom: {
    patch: DefaultPatch
  }
  changePageSize: (page_size: number) => void
  changeTargetSchema: (targetSchema: string) => void
  changeSwitcherHotkeys: (hotkeys: string[]) => void
  generateYAML: () => string | null
  needDownload: () => DownloadObject
}

const useDefaultState = create<DefaultState>()((set, get) => ({
  defaultCustom: {
    patch: {
      "menu/page_size": 5,
      schema_list: [{ schema: "luna_pinyin" }],
      "switcher/hotkeys": ["Control+grave", "Control+Shift+grave", "F4"],
    },
  },

  generateYAML: () => {
    const patch: Partial<DefaultPatch> = { ...get().defaultCustom.patch }

    if (patch["menu/page_size"] === 5) {
      delete patch["menu/page_size"]
    }

    const array1 = patch["switcher/hotkeys"]
    const array2 = ["Control+grave", "Control+Shift+grave", "F4"]

    if (array1 && array1.length === array2.length && array1.every((value, index) => value === array2[index])) {
      delete patch["switcher/hotkeys"]
    }

    if (patch.schema_list?.length === 1 && patch.schema_list[0].schema === "luna_pinyin") {
      delete patch.schema_list
    }

    if (Object.keys(patch).length === 0) {
      return null
    }

    return stringify({ patch: patch })
  },

  needDownload: () => {
    const state = get()
    const schemaName = state.defaultCustom.patch.schema_list[0].schema

    if (schemaName === "double_pinyin_flypy") {
      return {
        url: `https://raw.githubusercontent.com/rime/rime-double-pinyin/master/`,
        dictFileName: null,
        schemaFileName: "double_pinyin_flypy.schema.yaml",
      }
    }

    if (schemaName === "pinyin_simp") {
      return {
        url: `https://raw.githubusercontent.com/rime/rime-pinyin-simp/master/`,
        dictFileName: "pinyin_simp.dict.yaml",
        schemaFileName: "pinyin_simp.schema.yaml",
      }
    }
    return {
      url: null,
      dictFileName: null,
      schemaFileName: null,
    }
  },

  changePageSize: (page_size) =>
    set(
      produce((state) => {
        console.log("changePageSize")
        state.defaultCustom.patch["menu/page_size"] = page_size
      })
    ),

  changeTargetSchema: (targetSchema) =>
    set(
      produce((state) => {
        console.log("changeTargetSchema")

        state.defaultCustom.patch.schema_list = [{ schema: targetSchema }]
      })
    ),
  changeSwitcherHotkeys: (hotkeys) =>
    set(
      produce((state) => {
        console.log("changeSwitcherHotkeys")
        state.defaultCustom.patch["switcher/hotkeys"] = hotkeys
      })
    ),
}))

export type { DefaultState }
export default useDefaultState
