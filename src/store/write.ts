import { createSlice } from '@reduxjs/toolkit';

const writeSlice = createSlice({
  name: 'write',
  initialState: {
    content: [
      {
        title: '',
        status: '',
        content: '',
        type: '',
        makeTop: false,
        id: 0,
        like: false,
      },
    ],
  },
  reducers: {
    write: (state, action) => {
      console.log(action.payload);
      state.content = action.payload;
    },
    like: (state, action) => {
      const { id, like } = action.payload;
      let _content = state.content.find((list) => list.id === id);
      if (_content) {
        _content.like = like;
      }
    },
    changeStatus: (state, action) => {
      const { id, value } = action.payload;
      let _content = state.content.find((list) => list.id === id);
      if (_content) {
        _content.status = value;
      }
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

export const { write, like, changeStatus, topToggle } = writeSlice.actions;
export const writeContent = (state: any) => state.write.content;

export default writeSlice.reducer;
