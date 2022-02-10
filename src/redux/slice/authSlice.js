import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'user',
  initialState: {
    profile: {},
  },
  reducers: {
    setLoggedInUser: (state, { payload }) => {
      state.profile = payload;
    },
  },
});

export const { setLoggedInUser } = authSlice.actions;

export default authSlice.reducer;
