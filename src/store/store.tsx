import { configureStore } from '@reduxjs/toolkit'
import basicSlice from './BasicSlice'

const store = configureStore({
  reducer: {
    basic: basicSlice.reducer
  }
})

// 可以订阅 store
store.subscribe(() => console.log(store.getState()))


export default store;