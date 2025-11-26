
import { configureStore  } from "@reduxjs/toolkit";
import userReducer1 from "@redux/userSlice.js";

const store = configureStore({
    reducer:{
        user:userReducer1
    },

})

export default store;