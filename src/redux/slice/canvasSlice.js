import { createSlice } from '@reduxjs/toolkit';

const canvasSlice = createSlice({
  name: 'canvas',
  initialState: {
    canvasCollection: [],
    deletedCanvas: [],
  },
  reducers: {
    createCanvas: (state, { payload }) => {
      state.canvasCollection.push(payload);
    },
    deleteCanvas: (state, { payload }) => {
      state.canvasCollection = state.canvasCollection.filter((item) => item.id !== { payload });
    },
  },
});

export const { createCanvas, deleteCanvas } = canvasSlice.actions;

export default canvasSlice.reducer;
