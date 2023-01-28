import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './slice';
import newsSlice from './searchSlice';

export default configureStore({
  reducer: {
      dataDetails:dataReducer,
      newsData:newsSlice
  },
});