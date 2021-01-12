import { createSlice, configureStore } from '@reduxjs/toolkit';

const writeSlice = createSlice({
  name: 'write',
  initialState: {
    content: [],
  },
  reducers: {
    write: (state, action) => {
      console.log(action.payload);
      state.content = action.payload;
    },
  },
});

export const { write } = writeSlice.actions;
export const writeContent = (state: any) => state.write.content;

export default writeSlice.reducer;
