import { create } from "zustand"
import produce from "immer"
import punctuationJson from "./punctuation.json"
import assciPunctuationJson from "./assciPunctuation.json"
import { stringify } from "yaml"

interface SchemaPatch {
  punctuation: any
}

interface SchemaState {
  schemaCustom: {
    patch: SchemaPatch
  }
  fileName: string
  useAsciiStyle: (ascii: boolean) => void
  changeShape: (type: string, key: string, value: any) => void
  changeSchema: (name: string) => void
  generateYAML: () => string | null
}

function objectsEqual(a: object, b: object): boolean {
  return JSON.stringify(a) === JSON.stringify(b)
}

const useSchemaState = create<SchemaState>()((set, get) => ({
  fileName: "pinyin_simp.custom.yaml",
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

    if (Object.keys(patch).length === 0) {
      return null
    }

    return stringify(patch)
  },
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
}))

export type { SchemaState }
export default useSchemaState
