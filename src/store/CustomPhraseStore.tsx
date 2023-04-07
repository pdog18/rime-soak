import { create } from "zustand"
import produce from "immer"

type Phrase = {
  shortcut: string
  phrase: string
  weight: number
}

interface CustomPhraseState {
  enable: boolean
  phrases: Phrase[]
  enableCustomPhrase: (checked: boolean) => void
  addPhrase: (shortcut: string, phrase: string, weight: number) => void
  generateCustomPhrase: () => string | null
}

const useCustomPhrase = create<CustomPhraseState>()((set, get) => ({
  enable: false,
  phrases: [],
  enableCustomPhrase: (checked: boolean) => {
    set(
      produce((state) => {
        state.enable = checked
      })
    )
  },
  addPhrase: (shortcut, phrase, weight) =>
    set(
      produce((state) => {
        state.phrases.push({ shortcut, phrase, weight })
      })
    ),

  generateCustomPhrase: () => {
    const { enable, phrases } = get()
    if (!enable || phrases.length === 0) {
      return null
    }

    const allPhrasesText = phrases
      .map(({ phrase, shortcut, weight }) => {
        return `${phrase}\t${shortcut}\t${weight}`
      })
      .join("\n")

    return `# Rime table
# coding: utf-8
#@/db_name  custom_phrase.txt
#@/db_type	tabledb
# no comment
${allPhrasesText}`
  },
}))

export default useCustomPhrase
