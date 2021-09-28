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
    const data = yield call(request, {
      url: `/play/get`,
      method: 'GET',
    });
    if (data) {
      yield put(actions.getSucceed(data.data));
    } else {
      yield put(actions.getFailed());
    }
  } catch (error) {
    yield put(actions.getFailed());
  }
}

export function* start() {
  try {
    const data = yield call(request, {
      url: `/play/start`,
      method: 'GET',
    });
    if (data) {
      yield put(actions.startSucceed(data.data));
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
