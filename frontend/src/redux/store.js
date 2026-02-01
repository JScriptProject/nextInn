
import { configureStore  } from "@reduxjs/toolkit";
import userReducer from "@redux/userSlice.js";
import adminReducer from "@redux/adminSlice.js";


const store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer
  },
});

export default store;