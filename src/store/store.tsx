import { configureStore } from '@reduxjs/toolkit'
import { stringify } from 'yaml';
import defaultCustom from './DefaultSlice'
import punctuSlice from './PunctuSlice';
import skinSlice from './SkinSlice';
import rimeSlice from './StyleSlice';

const store = configureStore({
  reducer: {
    defaultCustom: defaultCustom.reducer,
    skin: skinSlice.reducer,
    punctu: punctuSlice.reducer,
    rimeCustom: rimeSlice.reducer,
  }
})
 

// 可以订阅 store
// todo 可以在这里统一管理，应该得到的 yaml 内容，而不在 reducer 中影响 reducer 的功能的单一性
store.subscribe(() => {
  console.log('>>>> onSubscribe ', store.getState())
})

export default store;
export type RootState = ReturnType<typeof store.getState>