import { create } from "zustand"
import produce from "immer"
import { stringify } from "yaml"
import KeyBinderJson from "./KeyBinder.json"

interface BinderRuler {
  when: string
  accept: string
  enable?: boolean
  send?: string
  toggle?: string
  select?: string
}

type SwitchKeyType = "commit_code" | "commit_text" | "inline_ascii" | "noop" | "clear"
interface DefaultPatch {
  "menu/page_size": number
  schema_list: [{ schema: string }]
  "switcher/hotkeys": string[]
  "key_binder/bindings": BinderRuler[]
  "ascii_composer/good_old_caps_lock": boolean
  "ascii_composer/switch_key/Caps_Lock": SwitchKeyType
  "ascii_composer/switch_key/Control_L": SwitchKeyType
  "ascii_composer/switch_key/Control_R": SwitchKeyType
  "ascii_composer/switch_key/Shift_L": SwitchKeyType
  "ascii_composer/switch_key/Shift_R": SwitchKeyType
  "ascii_composer/switch_key/Eisu_toggle": SwitchKeyType
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
  changeKeyBinder: (bindings: BinderRuler[]) => void
  generateYAML: () => string | null
  needDownload: () => DownloadObject
  changeCapsLock: (enalbe: boolean) => void
  changeHotkeys: (keyname: string, action: string) => void
}

const useDefaultState = create<DefaultState>()((set, get) => ({
  defaultCustom: {
    patch: {
      "menu/page_size": 5,
      schema_list: [{ schema: "luna_pinyin" }],
      "switcher/hotkeys": ["Control+grave", "Control+Shift+grave", "F4"],
      "key_binder/bindings": KeyBinderJson,
      "ascii_composer/good_old_caps_lock": true,
      "ascii_composer/switch_key/Caps_Lock": "clear",
      "ascii_composer/switch_key/Control_L": "noop",
      "ascii_composer/switch_key/Control_R": "noop",
      "ascii_composer/switch_key/Shift_L": "inline_ascii",
      "ascii_composer/switch_key/Shift_R": "commit_text",
      "ascii_composer/switch_key/Eisu_toggle": "clear",
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

    const filter = patch["key_binder/bindings"]!.filter((binder) => {
      return binder.enable !== undefined
    })

    if (filter.length === 0) {
      delete patch["key_binder/bindings"]
    } else {
      patch["key_binder/bindings"] = patch["key_binder/bindings"]!.filter(
        (binder) => binder.enable || binder.enable === undefined
      ).map((binder) => {
        const { enable, ...rest } = binder
        return rest
      })
    }

    if (patch["ascii_composer/good_old_caps_lock"] === true) {
      delete patch["ascii_composer/good_old_caps_lock"]
    }
    if (patch["ascii_composer/switch_key/Caps_Lock"] === "clear") {
      delete patch["ascii_composer/switch_key/Caps_Lock"]
    }
    if (patch["ascii_composer/switch_key/Control_L"] === "noop") {
      delete patch["ascii_composer/switch_key/Control_L"]
    }
    if (patch["ascii_composer/switch_key/Control_R"] === "noop") {
      delete patch["ascii_composer/switch_key/Control_R"]
    }
    if (patch["ascii_composer/switch_key/Shift_L"] === "inline_ascii") {
      delete patch["ascii_composer/switch_key/Shift_L"]
    }
    if (patch["ascii_composer/switch_key/Shift_R"] === "commit_text") {
      delete patch["ascii_composer/switch_key/Shift_R"]
    }
    if (patch["ascii_composer/switch_key/Eisu_toggle"] === "clear") {
      delete patch["ascii_composer/switch_key/Eisu_toggle"]
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
        state.defaultCustom.patch["menu/page_size"] = page_size
      })
    ),

  changeTargetSchema: (targetSchema) =>
    set(
      produce((state) => {
        state.defaultCustom.patch.schema_list = [{ schema: targetSchema }]
      })
    ),
  changeSwitcherHotkeys: (hotkeys) =>
    set(
      produce((state) => {
        state.defaultCustom.patch["switcher/hotkeys"] = hotkeys
      })
    ),
  changeKeyBinder: (bindings) =>
    set(
      produce((state) => {
        state.defaultCustom.patch["key_binder/bindings"] = bindings
      })
    ),

  changeCapsLock: (enable) =>
    set(
      produce((state) => {
        state.defaultCustom.patch["ascii_composer/good_old_caps_lock"] = enable
        state.defaultCustom.patch["ascii_composer/switch_key/Caps_Lock"] = enable ? "clear" : "commit_code"
      })
    ),
  changeHotkeys: (keyname, value) =>
    set(
      produce((state) => {
        state.defaultCustom.patch[`ascii_composer/switch_key/${keyname}`] = value
      })
    ),
}))

export type { DefaultState, BinderRuler }
export default useDefaultState
