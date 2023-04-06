import { create } from "zustand"
import produce from "immer"
import punctuationJson from "./punctuation.json"
import assciPunctuationJson from "./assciPunctuation.json"
import { stringify } from "yaml"

interface SchemaPatch {
  punctuation: any
  "engine/translators/+"?: []
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
  quickType: (checked: boolean, name: string) => void
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

    if (patch["engine/translators/+"] && patch["engine/translators/+"].length === 0) {
      delete patch["engine/translators/+"]
    }

    if (Object.keys(patch).length === 0) {
      return null
    }

    return stringify({ patch: patch })
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
  quickType: (checked, name) => {
    set(
      produce((state) => {
        const translator = `lua_translator@${name}_translator`
        let translators: string[] = []

        if (state.schemaCustom.patch["engine/translators/+"]) {
          translators = [...state.schemaCustom.patch["engine/translators/+"]]
        }
        if (checked) {
          state.schemaCustom.patch["engine/translators/+"] = [...translators, translator]
        } else {
          state.schemaCustom.patch["engine/translators/+"] = translators.filter((t: string) => t !== translator)
        }
      })
    )
  },
}))

export type { SchemaState }
export default useSchemaState
