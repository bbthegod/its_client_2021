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
    const { response } = yield call(request, {
      url: '/play/continue',
      method: 'GET',
    });
    if (response) {
      yield put(actions.getSucceed(response));
    } else {
      yield put(actions.getFailed());
    }
  } catch (err) {
    yield put(actions.getFailed());
  }
}

export function* end() {
  try {
    const { response } = yield call(request, {
      url: '/play/end',
      method: 'GET',
    });
    if (response) {
      yield put(actions.endSucceed(response));
    } else {
      yield put(actions.endFailed());
    }
  } catch (err) {
    yield put(actions.endFailed());
  }
}

export function* homePageSaga() {
  yield takeLatest(actions.get.type, get);
  yield takeLatest(actions.end.type, end);
}
