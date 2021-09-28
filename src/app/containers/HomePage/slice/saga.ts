/*
 *
 * HomePage Saga
 *
 */
import { call, put, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';
import { actions } from '.';

export function* get() {
  try {
    const respone = yield call(request, {
      url: '/play/continue',
      method: 'GET',
    });
    if (respone) {
      yield put(actions.getSucceed(respone.data));
    } else {
      yield put(actions.getFailed());
    }
  } catch (err) {
    yield put(actions.getFailed());
  }
}

export function* homePageSaga() {
  yield takeLatest(actions.get.type, get);
}
