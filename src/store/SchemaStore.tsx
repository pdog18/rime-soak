import { create } from "zustand"
import produce from "immer"
import punctuationJson from "./punctuation.json"
import assciPunctuationJson from "./assciPunctuation.json"

interface SchemaState {
  schema: {
    patch: {
      punctuation: any
    }
  }
  fileName: string
  useAsciiStyle: (ascii: boolean) => void
  changeShape: (type: string, key: string, value: any) => void
  changeSchema: (name: string) => void
}

const useSchemaState = create<SchemaState>()((set) => ({
  fileName: "luna_pinyin_simp.custom.yaml",
  schema: {
    patch: {
      punctuation: punctuationJson,
    },
  },
  useAsciiStyle: (ascii) =>
    set(
      produce((state) => {
        state.schema.patch.punctuation = ascii ? assciPunctuationJson : punctuationJson
      })
    ),
  changeShape: (type, key, value) =>
    set(
      produce((state) => {
        state.schema.patch.punctuation[type][key] = value
      })
    ),
  changeSchema: (name) => {
    set(
      produce((state) => {
        state.fileName = name
      })
    )
  },
}))

export type { SchemaState }
export default useSchemaState
