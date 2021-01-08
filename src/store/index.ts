import { configureStore, createSlice } from '@reduxjs/toolkit';

const projects = createSlice({
  name: 'projectsReducer',
  initialState: [],
  reducers: {
    add: (state, action) => {
      console.log(state);
    },
    remove: (state, action) => {
      console.log(state);
    },
  },
});

export const { add, remove } = projects.actions;

export default configureStore({ reducer: projects.reducer });
