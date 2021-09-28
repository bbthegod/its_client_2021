import { combineReducers } from '@reduxjs/toolkit';
import { all } from 'redux-saga/effects';
import { homePageSlice } from 'app/containers/HomePage/slice';
import { loginPageSlice } from 'app/containers/LoginPage/slice';
import { readyPageSlice } from 'app/containers/ReadyPage/slice';
// GENERATE NEW IMPORT ABOVE, DO NOT DELETE IT

const slices = [
  homePageSlice,
  loginPageSlice,
  readyPageSlice,
  // GENERATE NEW SLICE ABOVE, DO NOT DELETE IT
];

export function rootReducer() {
  if (slices.length === 0) {
    return {};
  } else {
    let tree = {};
    for (let reducer of slices) {
      tree[reducer.key] = reducer.reducer;
    }
    return combineReducers(tree);
  }
}

export function* rootSaga() {
  const sagas = yield slices.map(item => item.saga());
  yield all(sagas);
}
