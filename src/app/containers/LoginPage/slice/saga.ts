/*
 *
 * LoginPage Saga
 *
 */
import { call, put, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';
import { actions } from '.';

export function* login(payload) {
  try {
    const respone = yield call(request, {
      url: '/auth/login',
      method: 'POST',
      data: {
        studentCode: payload.payload.studentCode,
        password: payload.payload.password,
      },
    });
    if (respone) {
      yield put(actions.loginSucceed(respone));
    } else {
      yield put(actions.loginFailed());
      yield put(
        actions.openSnackbar({
          status: true,
          message: 'Đăng nhập thất bại',
          variant: 'error',
        }),
      );
    }
  } catch (err) {
    yield put(actions.loginFailed());
    yield put(
      actions.openSnackbar({
        status: true,
        message: 'Đăng nhập thất bại',
        variant: 'error',
      }),
    );
  }
}

export function* loginPageSaga() {
  yield takeLatest(actions.login.type, login);
}
