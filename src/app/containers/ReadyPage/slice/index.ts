/*
 *
 * ReadyPage Slice
 *
 */
import { createSlice } from 'utils/@reduxjs/toolkit';
import { readyPageSaga } from './saga';
import { ReadyPageState } from './types';

export const initialState: ReadyPageState = {
  playData: undefined,
  loading: false,
  success: false,
  failures: false,
};

const slice = createSlice({
  name: 'readyPage',
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
    start(state) {
      state.loading = true;
      state.success = false;
      state.failures = false;
    },
    startSucceed(state, actions) {
      state.playData = actions.payload;
      state.loading = false;
      state.success = true;
      state.failures = false;
    },
    startFailed(state) {
      state.loading = false;
      state.success = false;
      state.failures = true;
    },
  },
});

export const { actions } = slice;

export const readyPageSlice = { key: slice.name, reducer: slice.reducer, saga: readyPageSaga };
