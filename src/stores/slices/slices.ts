import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    Add: (state) => {
      state.value += 1;
    },
    Substrack: (state) => {
      state.value -= 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const { Substrack, Add } = counterSlice.actions;

export default counterSlice.reducer;
