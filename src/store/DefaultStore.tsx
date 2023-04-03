import { create } from "zustand"
import produce from "immer"

interface DefaultState {
  defaultCustom: {
    patch: {
      "menu/page_size": number
      schema_list: [{ schema: string }]
      "switcher/hotkeys": string[]
    }
  }
  changePageSize: (page_size: number) => void
  changeTargetSchema: (targetSchema: string) => void
  changeSwitcherHotkeys: (hotkeys: string[]) => void
}

const useDefaultState = create<DefaultState>()((set) => ({
  defaultCustom: {
    patch: {
      "menu/page_size": 5,
      schema_list: [{ schema: "pinyin_simp" }],
      "switcher/hotkeys": ["Control+grave", "Control+Shift+grave", "F4"],
    },
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
