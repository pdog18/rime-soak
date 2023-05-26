import { create } from "zustand"
import produce from "immer"
import punctuationJson from "./punctuation.json"
import asciiPunctuationJson from "./asciiPunctuation.json"
import * as yaml from "js-yaml"

interface SchemaPatch {
  punctuator: any
  "engine/translators/+"?: string[]
  "engine/filters/+"?: string[]
  "schema/dependencies"?: string[]
  word_simp?: object
  custom_phrase?: object
}

interface SchemaState {
  enableEnglishWord(checked: boolean): void
  schemaCustom: {
    patch: SchemaPatch
  }
  fileName: string
  useAsciiPunctuation: boolean
  supportEnglishWord: boolean
  supportCustomPhrase: boolean
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

const useSchemaState = create<SchemaState>()((set, get) => ({
  fileName: "luna_pinyin.custom.yaml",
  useAsciiPunctuation: false,
  supportEnglishWord: false,
  supportCustomPhrase: false,
  schemaCustom: {
    patch: {
      punctuator: punctuationJson,
    },
  },

  generateYAML: () => {
    const { useAsciiPunctuation, schemaCustom, supportEnglishWord, supportCustomPhrase } = get()

    const patch: Partial<SchemaPatch> = { ...schemaCustom.patch }
    if (objectsEqual(patch.punctuator!, punctuationJson)) {
      delete patch.punctuator
    }

    if (supportEnglishWord) {
      const translator = "table_translator@word_simp"
      const key = "engine/translators/+"
      patch[key] = [...(patch[key] ?? []), translator]

      const dependencies = "schema/dependencies"
      patch[dependencies] = ["word_simp"]

      patch["word_simp"] = {
        dictionary: "word_simp",
        enable_sentence: false,
        enable_user_dict: false,
        initial_quality: 0.1,
        comment_format: ["xform/.*//"],
      }
    }

    if (supportCustomPhrase) {
      const translator = "table_translator@custom_phrase"
      const translatorKey = "engine/translators/+"
      patch[translatorKey] = [...(patch[translatorKey] ?? []), translator]

      const filtersKey = "engine/filters/+"

      patch[filtersKey] = [...(patch[filtersKey] ?? []), "uniquifier"]

      patch.custom_phrase = {
        dictionary: "",
        user_dict: "custom_phrase",
        db_class: "stabledb",
        enable_completion: false,
        enable_sentence: false,
        initial_quality: 1,
      }
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

  enableEnglishWord: (enable) =>
    set(
      produce((state) => {
        state.supportEnglishWord = enable
      })
    ),

  enableCustomPhrase: (enable) =>
    set(
      produce((state) => {
        state.supportCustomPhrase = enable
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
