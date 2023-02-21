import { createSlice } from '@reduxjs/toolkit'

const schema = {

}

const schemaSlice = createSlice({
  name: 'schema',
  initialState: schema,
  reducers: {
    xxx: (state, actions) => {

    },
    xxxd: (state, actions) => {

    },
  }
})

export const { xxx, xxxd } = schemaSlice.actions;
export default schemaSlice;