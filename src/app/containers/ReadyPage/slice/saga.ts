/*
 *
 * ReadyPage Saga
 *
 */
import { call, put, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';
import { actions } from '.';

export function* get() {
  try {
    const { response } = yield call(request, {
      url: `/play/get`,
      method: 'GET',
    });
    if (response) {
      yield put(actions.getSucceed(response));
    } else {
      yield put(actions.getFailed());
    }
  } catch (error) {
    yield put(actions.getFailed());
  }
}

export function* start() {
  try {
    const { response } = yield call(request, {
      url: `/play/start`,
      method: 'GET',
    });
    if (response) {
      yield put(actions.startSucceed(response));
    } else {
      yield put(actions.startFailed());
    }
  } catch (error) {
    yield put(actions.startFailed());
  }
}

export function* readyPageSaga() {
  yield takeLatest(actions.get.type, get);
  yield takeLatest(actions.start.type, start);
}
