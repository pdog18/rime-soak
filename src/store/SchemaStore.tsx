import { create } from "zustand"
import produce from "immer"
import punctuationJson from "./punctuation.json"
import assciPunctuationJson from "./assciPunctuation.json"
import { stringify } from "yaml"

interface SchemaPatch {
  punctuation: any
  "engine/translators/+"?: string[]
  "engine/filters/+"?: string[]
  custom_phrase?: object
}

interface SchemaState {
  schemaCustom: {
    patch: SchemaPatch
  }
  fileName: string
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
  schemaCustom: {
    patch: {
      punctuation: punctuationJson,
    },
  },

  generateYAML: () => {
    const patch: Partial<SchemaPatch> = { ...get().schemaCustom.patch }
    if (objectsEqual(patch.punctuation, punctuationJson)) {
      delete patch.punctuation
    }
    const translatorsKey = "engine/translators/+"
    const filterKey = "engine/filters/+"

    if ((patch[filterKey] && patch[filterKey].length === 0) || schemaIsLunaPinyin(get().fileName)) {
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

    if (Object.keys(patch).length === 0) {
      return null
    }

    return stringify({ patch: patch })
  },

  enableCustomPhrase: (enable) =>
    set(
      produce((state) => {
        const translator = `table_translator@custom_phrase`
        updateTranslators(translator, state, enable)
        const filter = "uniquifier"
        updateFilters(filter, state, enable)
        if (enable) {
          console.log(enable)

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
        state.schemaCustom.patch.punctuation = ascii ? assciPunctuationJson : punctuationJson
      })
    ),
  changeShape: (type, key, value) =>
    set(
      produce((state) => {
        state.schemaCustom.patch.punctuation[type][key] = value
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
        // let translators: string[] = []

        // if (state.schemaCustom.patch["engine/translators/+"]) {
        //   translators = [...state.schemaCustom.patch["engine/translators/+"]]
        // }
        // if (checked) {
        //   state.schemaCustom.patch["engine/translators/+"] = [...translators, translator]
        // } else {
        //   state.schemaCustom.patch["engine/translators/+"] = translators.filter((t: string) => t !== translator)
        // }
      })
    )
  },
}))

export type { SchemaState }
export default useSchemaState
