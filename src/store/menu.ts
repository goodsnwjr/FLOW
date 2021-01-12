import { createSlice } from '@reduxjs/toolkit';

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

export default menuSlice.reducer;
