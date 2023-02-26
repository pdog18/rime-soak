import { configureStore, Unsubscribe } from '@reduxjs/toolkit'
import basicSlice from './BasicSlice'
import punctuSlice from './PunctuSlice';
import schemaSlice from './SchemaSlice';
import skinSlice from './SkinSlice';

const store = configureStore({
  reducer: {
    basic: basicSlice.reducer,
    skin: skinSlice.reducer,
    schema: schemaSlice.reducer,
    punctu: punctuSlice.reducer,
  }
})

// 可以订阅 store
// todo 可以在这里统一管理，应该得到的 yaml 内容，而不在 reducer 中影响 reducer 的功能的单一性
store.subscribe(() => {
  console.log('log in >>>> subscribe ', store.getState())
})

export default store;
export type RootState = ReturnType<typeof store.getState>