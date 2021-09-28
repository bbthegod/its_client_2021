/*
 *
 * HomePage Slice
 *
 */
import { createSlice } from 'utils/@reduxjs/toolkit';
import { homePageSaga } from './saga';
import { HomePageState } from './types';

export const initialState: HomePageState = {
  playData: undefined,
  loading: false,
  success: false,
  failures: false,
};

const slice = createSlice({
  name: 'homePage',
  initialState,
  reducers: {
    get(state) {
      state.loading = true;
      state.success = false;
      state.failures = false;
    },
    getSucceed(state, actions) {
      state.playData = actions.payload;
      state.loading = false;
      state.success = true;
      state.failures = false;
    },
    getFailed(state) {
      state.loading = false;
      state.success = false;
      state.failures = true;
    },
  },
});

export const { actions } = slice;

export const homePageSlice = { key: slice.name, actions: slice.actions, reducer: slice.reducer, saga: homePageSaga };
