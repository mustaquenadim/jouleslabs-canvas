import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthenticated: false,
    profile: {},
  },
  reducers: {
    setLoggedInUser: (state, payload) => {
      state.isAuthenticated = true;
      state.profile = payload;
    },
  },
});

export const { setLoggedInUser } = authSlice.actions;

export default authSlice.reducer;
