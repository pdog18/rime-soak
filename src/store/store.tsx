import { configureStore } from '@reduxjs/toolkit'
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
store.subscribe(() => console.log(store.getState()))

export default store;
export type RootState = ReturnType<typeof store.getState>