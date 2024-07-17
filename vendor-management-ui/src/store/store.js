import { configureStore } from "@reduxjs/toolkit";
import tablelistslice from "./slice/tablelistslice";

const appStore = configureStore({
  reducer: {
    tableData: tablelistslice,
  },
})

export default appStore; 


