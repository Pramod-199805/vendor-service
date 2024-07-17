import { createSlice } from "@reduxjs/toolkit";

const tableListSlice = createSlice({
  name:"tablelist",
  initialState:{
    tableUpdate:false,
    list:[]
  },
  reducers:{
    updateTable : (state, action) => {
      state.tableUpdate = !state.tableUpdate
    }
  }
})

export const {updateTable} = tableListSlice.actions
export default tableListSlice.reducer