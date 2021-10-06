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
    const { response, error } = yield call(request, {
      url: '/auth/login',
      method: 'POST',
      data: {
        studentCode: payload.payload.studentCode,
        password: payload.payload.password,
      },
    });
    if (response) {
      yield put(actions.loginSucceed(response));
    } else if (error) {
      if (error.response.status === 401) {
        yield put(actions.loginFailed());
        yield put(
          actions.openSnackbar({
            status: true,
            message: 'Tài khoản hoặc mật khẩu không chính xác',
            variant: 'error',
          }),
        );
      }
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
    console.log(err, 'asdsadasd asd as das');
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
