import React from "react"

export interface SoakDefault {
  soakDefault?: object
  soakStyle?: object
  soakSchema?: object
}

export interface SoakDefaultState {
  soakDefault?: SoakDefault
  setSoakDefault?: (entry: SoakDefault) => void
}

/**
 * 用来存放 soak 一些设置的默认值
 * 果点击「跳过」这个值则是几个 slice 中的 state 的默认值
 * 如果 Drop 那么则是 Drop 的值
 *  (两者都是 copy 后的)
 *
 *
 * 这几个值会被用于判断某个文件是否需要改变，同时即也为 FloatButton 的显示/隐藏的依据
 */
const OriginContext = React.createContext<SoakDefaultState>({})

export default OriginContext
