import { createSlice } from '@reduxjs/toolkit';

const writeSlice = createSlice({
  name: 'write',
  initialState: {
    content: [
      {
        projectId: 0,
        title: '',
        status: '',
        statusKo: '',
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
      state.content = action.payload;
    },
    like: (state, action) => {
      const { id, like } = action.payload;
      let _content: any = state.content.find((list: any) => list.id === id);
      if (_content) {
        _content.like = like;
      }
    },
    changeStatus: (state, action) => {
      const { id, value, valueKo } = action.payload;
      let _content: any = state.content.find((list: any) => list.id === id);
      if (_content) {
        _content.status = value;
        _content.statusKo = valueKo;
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
