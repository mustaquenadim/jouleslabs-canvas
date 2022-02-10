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
    updateEditedCanvas: (state, { payload }) => {
      console.log(payload?.id, payload);
      // const canvas = state.canvasCollection.find((canvas) => canvas.id === payload.id);
      state.canvasCollection[payload?.id] = payload;
      // state.canvasCollection.map((canvas, index) => (payload.id === index ? payload : canvas));
    },
    deleteCanvas: (state, { payload }) => {
      state.canvasCollection = state.canvasCollection.filter((item) => item.id !== { payload });
    },
  },
});

export const { createCanvas, updateEditedCanvas, deleteCanvas } = canvasSlice.actions;

export default canvasSlice.reducer;
