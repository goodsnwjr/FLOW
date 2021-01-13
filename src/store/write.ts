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
        like: 0,
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
        _content.like = _content.like + like;
      }
    },
    changeStatus: (state, action) => {
      const { id, value } = action.payload;
      let _content = state.content.find((list) => list.id === id);
      if (_content) {
        _content.status = value;
      }
    },
  },
});

export const { write, like, changeStatus } = writeSlice.actions;
export const writeContent = (state: any) => state.write.content;

export default writeSlice.reducer;
