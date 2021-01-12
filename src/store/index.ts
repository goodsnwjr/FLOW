import { createSlice, configureStore } from '@reduxjs/toolkit';

const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    projectList: [
      {
        id: 135232,
        title: 'title1',
        people: [
          {
            name: '관리자1',
            auth: 'admin',
          },
          {
            name: '관리자2',
            auth: 'admin',
          },
        ],
        favorites: false,
      },
      {
        id: 263632,
        title: 'title2',
        people: [
          {
            name: '관리자1',
            auth: 'admin',
          },
          {
            name: '관리자2',
            auth: 'admin',
          },
        ],
        favorites: false,
      },
      {
        id: 313627,
        title: 'title3',
        people: [
          {
            name: '관리자1',
            auth: 'admin',
          },
          {
            name: '관리자2',
            auth: 'admin',
          },
        ],
        favorites: false,
      },
    ],
    onMenu: 'all',
  },
  reducers: {
    add: (state, action) => {
      console.log(state.projectList);
      state.projectList = action.payload;
    },
    remove: (state, action) => {
      console.log(state.projectList);
      state.projectList = action.payload;
    },
    update: (state, action) => {
      console.log(state);
      console.log(action.payload);
      state.projectList.concat(action.payload);
    },
    favorite: (state, action) => {
      state.projectList = action.payload;
    },
  },
});

export const { add, remove, update, favorite } = projectsSlice.actions;
export const selectProjects = (state: any) => state.projects.projectList;

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    onMenu: 'all',
  },
  reducers: {
    menuChange: (state, action) => {
      state.onMenu = action.payload;
    },
  },
});

export const { menuChange } = menuSlice.actions;
export const selectMenu = (state: any) => state.menu.onMenu;

export default configureStore({
  reducer: { projects: projectsSlice.reducer, menu: menuSlice.reducer },
});
