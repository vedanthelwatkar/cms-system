import { configureStore } from "@reduxjs/toolkit";
import clientReducer from "../slices/clientSlice";
import userReducer from "../slices/userSlice";
import adminReducer from "../slices/adminSlice";

const store = configureStore({
  reducer: {
    clients: clientReducer,
    users: userReducer,
    admin: adminReducer,
  },
});

export default store;
