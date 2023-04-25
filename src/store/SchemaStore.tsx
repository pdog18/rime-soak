import { create } from "zustand"
import produce from "immer"
import punctuationJson from "./punctuation.json"
import asciiPunctuationJson from "./asciiPunctuation.json"
import * as yaml from "js-yaml"

interface SchemaPatch {
  punctuator: any
  "engine/translators/+"?: string[]
  "engine/filters/+"?: string[]
  custom_phrase?: object
}

interface SchemaState {
  schemaCustom: {
    patch: SchemaPatch
  }
  fileName: string
  useAsciiPunctuation: boolean
  useAsciiStyle: (ascii: boolean) => void
  changeShape: (type: string, key: string, value: any) => void
  changeSchema: (name: string) => void
  enableCustomPhrase: (enable: boolean) => void
  generateYAML: () => string | null
  quickType: (checked: boolean, name: string) => void
}

function objectsEqual(a: object, b: object): boolean {
  return JSON.stringify(a) === JSON.stringify(b)
}

const schemaIsLunaPinyin = (fileName: string) => fileName.startsWith("luna_pinyin")

const updateTranslators = (translator: string, state: any, add: boolean) => {
  const key = "engine/translators/+"
  let translators: string[] = []

  if (state.schemaCustom.patch[key]) {
    translators = [...state.schemaCustom.patch[key]]
  }
  if (add) {
    state.schemaCustom.patch[key] = [...translators, translator]
  } else {
    state.schemaCustom.patch[key] = translators.filter((t: string) => t !== translator)
  }
}

const updateFilters = (filter: string, state: any, add: boolean) => {
  const key = "engine/filters/+"
  let filters: string[] = []
  if (state.schemaCustom.patch[key]) {
    filters = [...state.schemaCustom.patch[key]]
  }

  if (add) {
    state.schemaCustom.patch[key] = [...filters, filter]
  } else {
    state.schemaCustom.patch[key] = filters.filter((t: string) => t !== filter)
  }
}

const useSchemaState = create<SchemaState>()((set, get) => ({
  fileName: "luna_pinyin.custom.yaml",
  useAsciiPunctuation: false,
  schemaCustom: {
    patch: {
      punctuator: punctuationJson,
    },
  },

  generateYAML: () => {
    const { fileName, useAsciiPunctuation, schemaCustom } = get()

    const patch: Partial<SchemaPatch> = { ...schemaCustom.patch }
    if (objectsEqual(patch.punctuator!, punctuationJson)) {
      delete patch.punctuator
    }
    const translatorsKey = "engine/translators/+"
    const filterKey = "engine/filters/+"

    if (patch[filterKey] && (patch[filterKey].length === 0 || schemaIsLunaPinyin(fileName))) {
      delete patch[filterKey]

      patch[translatorsKey] = patch[translatorsKey]!.filter(
        (translator) => translator !== "table_translator@custom_phrase"
      )
      if (patch.custom_phrase) {
        delete patch.custom_phrase
      }
    }

    if (patch[translatorsKey] && patch[translatorsKey].length === 0) {
      delete patch[translatorsKey]
    }

    const justCheckUseAscii = useAsciiPunctuation && patch.punctuator === asciiPunctuationJson
    if (justCheckUseAscii) {
      patch.punctuator = {
        full_shape: {},
        half_shape: {},
        ascii_style: {},
      }
    }

    if (Object.keys(patch).length === 0) {
      return null
    }

    return yaml.dump({ patch: patch })
  },

  enableCustomPhrase: (enable) =>
    set(
      produce((state) => {
        const translator = `table_translator@custom_phrase`
        updateTranslators(translator, state, enable)
        const filter = "uniquifier"
        updateFilters(filter, state, enable)
        if (enable) {
          state.schemaCustom.patch.custom_phrase = {
            dictionary: "",
            user_dict: "custom_phrase",
            db_class: "stabledb",
            enable_completion: false,
            enable_sentence: false,
            initial_quality: 1,
          }
        }
      })
    ),

  useAsciiStyle: (ascii) =>
    set(
      produce((state) => {
        state.schemaCustom.patch.punctuator = ascii ? asciiPunctuationJson : punctuationJson
        state.useAsciiPunctuation = ascii
      })
    ),
  changeShape: (type, key, value) =>
    set(
      produce((state) => {
        state.schemaCustom.patch.punctuator[type][key] = value
      })
    ),
  changeSchema: (name) => {
    set(
      produce((state) => {
        state.fileName = `${name}.custom.yaml`
      })
    )
  },
  quickType: (checked, name) => {
    set(
      produce((state) => {
        const translator = `lua_translator@${name}_translator`
        updateTranslators(translator, state, checked)
      })
    )
  },
}))

export type { SchemaState }
export default useSchemaState
