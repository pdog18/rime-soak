import { create } from "zustand"
import produce from "immer"

interface RimeLuaState {
  time: boolean
  date: boolean
  week: boolean
  generateRimeLua: () => string | null
  quickType: (checked: boolean, name: string) => void
}

const useRimeLuaState = create<RimeLuaState>()((set, get) => ({
  time: false,
  date: false,
  week: false,
  generateRimeLua: () => {
    const { time, date, week } = get()
    if (!time && !date && !week) {
      return null
    }

    const timeLuaFunction = `function time_translator(input, seg)
    if (input == "time") then
       yield(Candidate("time", seg.start, seg._end, os.date("%H:%M:%S"), " 时间"))
    end
 end`
    const dateLuaFunction = `function date_translator(input, seg)
    if (input == "date") then
       yield(Candidate("date", seg.start, seg._end, os.date("%Y年%m月%d日"), "日期"))
       yield(Candidate("date", seg.start, seg._end, os.date("%Y-%m-%d"), "日期"))
    end
 end`
    const weekLuaFunction = `function week_translator(input, seg)
    if (input == "week") then
        arr = {"日", "二", "三", "四", "五", "六"}
        yield(Candidate("date", seg.start, seg._end, os.date(
                            "%Y-%m-%d 星期" .. arr[tonumber(os.date("%w"))]),
                        ""))
    end
end`

    const content = [
      time ? `${timeLuaFunction}` : "",
      date ? `${dateLuaFunction}` : "",
      week ? `${weekLuaFunction}` : "",
    ].join("\n\n\n")

    return content
  },

  quickType: (checked, name) => {
    set(
      produce((state) => {
        state[name] = checked
      })
    )
  },
}))

export default useRimeLuaState
