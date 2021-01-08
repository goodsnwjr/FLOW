import { createSlice, configureStore } from '@reduxjs/toolkit';

const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    projectList: [
      {
        id: 135232,
        title: '[SI] 현대캐피탈-신차영업팀',
        people: 21,
        favorites: false,
      },
      {
        id: 263632,
        title: '[아이엠폼] 공지',
        people: 81,
        favorites: false,
      },
      {
        id: 313627,
        title: '[IMS] 통합 관리',
        people: 25,
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
    favorite: (state, action) => {
      state.projectList = action.payload;
    },
    menuChange: (state, action) => {
      state.onMenu = action.payload;
    },
  },
});

export const { add, remove, favorite, menuChange } = projectsSlice.actions;

export const selectProjects = (state: any) => state.projects.projectList;
export const selectMenu = (state: any) => state.projects.onMenu;

// export default projectsSlice.reducer;

export default configureStore({ reducer: { projects: projectsSlice.reducer } });
