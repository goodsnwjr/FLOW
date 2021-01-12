import { configureStore } from '@reduxjs/toolkit';

import menuSliceReducer from './menu';
import projectSliceReducer from './project';
import writeSliceReducer from './write';

export default configureStore({
  reducer: { projects: projectSliceReducer, menu: menuSliceReducer, write: writeSliceReducer },
});
