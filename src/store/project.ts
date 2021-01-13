import { createSlice } from '@reduxjs/toolkit';

export const defaultColor = [
  'mistyrose',
  'skyblue',
  'gold',
  'tomato',
  'coral',
  'gray',
  'aquamarine',
  'thistle',
  'lightblue',
  'cornflowerblue',
];
export interface projectInitState {
  favorites: boolean;
  id: string | number | null | undefined;
  mainColor: string | undefined;
  title: React.ReactNode;
  participants: [{ name: string; auth: string }];
}

const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    projectList: [
      {
        id: 1351232,
        title: 'title1',
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
        mainColor: 'mistyrose',
      },
      {
        id: 263632,
        title: 'title2',
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
        mainColor: 'skyblue',
      },
      {
        id: 313627,
        title: 'title3',
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
        mainColor: 'gold',
      },
    ],
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
