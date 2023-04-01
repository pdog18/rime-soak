import { configureStore } from "@reduxjs/toolkit"
import defaultSlice from "./DefaultSlice"
import skinSlice from "./SkinSlice"
import styleSlice from "./StyleSlice"
import soakSlice from "./SoakSlice"

const store = configureStore({
  reducer: {
    default: defaultSlice.reducer,
    skin: skinSlice.reducer,
    style: styleSlice.reducer,
    soak: soakSlice.reducer,
  },
})

// 可以订阅 store
// todo 可以在这里统一管理，应该得到的 yaml 内容，而不在 reducer 中影响 reducer 的功能的单一性
store.subscribe(() => {
  console.log(">>>> onSubscribe ", store.getState())
})

export default store
export type RootState = ReturnType<typeof store.getState>
