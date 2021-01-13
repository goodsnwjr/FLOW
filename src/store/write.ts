import { createSlice } from '@reduxjs/toolkit';

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
    topToggle: (state, action) => {
      const { id } = action.payload;
      let writeList: any = state.content.find((x: any) => x.id === id);
      if (writeList) {
        writeList.makeTop = writeList.makeTop ? false : true;
      }
    },
  },
});

export const { write, topToggle } = writeSlice.actions;
export const writeContent = (state: any) => state.write.content;

export default writeSlice.reducer;
