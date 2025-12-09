import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   user: null,
//   isLoading: false,
//   isAuthenticated: false,
// };

const initialState = {
  user: null,
  isLoading: true,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser, setLoading } = userSlice.actions;
export default userSlice.reducer;
