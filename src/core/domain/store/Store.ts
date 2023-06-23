import { configureStore } from '@reduxjs/toolkit';
import appReducerMap from '../reducers/ReducerMap';

const store = configureStore({
    reducer: appReducerMap
  });
  
export default store;
