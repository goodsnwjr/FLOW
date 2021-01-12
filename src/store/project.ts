import { createSlice } from '@reduxjs/toolkit';

const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    projectList: [
      {
        id: 135232,
        title: 'title1',
        mainColor: 'yellow',
        participants: [
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
        mainColor: 'pink',
        participants: [
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
        mainColor: 'green',
        participants: [
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
    onsdsd: '',
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
      const { auth, name, projectid } = action.payload;
      let _projectList = state.projectList.find((x) => x.id === projectid);
      if (_projectList) {
        _projectList.participants = [..._projectList.participants, { name, auth }];
      }
    },
    favorite: (state, action) => {
      state.projectList = action.payload;
    },
  },
});

export const { add, remove, update, favorite } = projectsSlice.actions;
export const selectProjects = (state: any) => state.projects.projectList;

export default projectsSlice.reducer;
