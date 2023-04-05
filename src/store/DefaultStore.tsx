import { create } from "zustand"
import produce from "immer"
import { stringify } from "yaml"

interface DefaultPatch {
  "menu/page_size": number
  schema_list: [{ schema: string }]
  "switcher/hotkeys": string[]
}

interface DefaultState {
  defaultCustom: {
    patch: DefaultPatch
  }
  changePageSize: (page_size: number) => void
  changeTargetSchema: (targetSchema: string) => void
  changeSwitcherHotkeys: (hotkeys: string[]) => void
  generateYAML: () => string | null
}

const useDefaultState = create<DefaultState>()((set, get) => ({
  defaultCustom: {
    patch: {
      "menu/page_size": 5,
      schema_list: [{ schema: "pinyin_simp" }],
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

    if (patch.schema_list?.length === 1 && patch.schema_list[0].schema === "pinyin_simp") {
      delete patch.schema_list
    }

    if (Object.keys(patch).length === 0) {
      return null
    }

    return stringify(patch)
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
