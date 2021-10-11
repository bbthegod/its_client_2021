/*
 *
 * LoginPage
 *
 */
import { Paper, Button, Typography, InputAdornment, TextField, IconButton, CircularProgress } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

import AuthStorageContext from 'context/AuthStorageContext';
import SnackbarContext from 'context/SnackbarContext';
import { selectLoginPage } from './slice/selectors';
import classes from './styles.module.css';
import { actions } from './slice';

interface Props {}

const validationSchema = Yup.object().shape({
  studentCode: Yup.string()
    .required('Mã sinh viên không được để trống !')
    .matches(/^[0-9]{10}$/, 'Mã sinh viên không hợp lệ, ví dụ: 2017604482'),
  password: Yup.string().required('Mật khẩu không được để trống !'),
});

export default function LoginPage(props: Props) {
  //====================================== State ======================================
  const [showPassword, setShowPassword] = useState(false);
  //====================================== Hooks ======================================
  const { data, loading, snackbar, message, variant } = useSelector(selectLoginPage);
  const AuthStorage = useContext(AuthStorageContext);
  const Snackbar = useContext(SnackbarContext);
  const dispatch = useDispatch();
  const history = useHistory();
  //====================================== Effect ======================================

  useEffect(() => {
    if (AuthStorage.get()) {
      history.push('/play');
    }
  }, [AuthStorage, history]);

  //Open snackbar when login failed
  useEffect(() => {
    if (snackbar) {
      Snackbar.open(message, variant);
      setTimeout(() => dispatch(actions.closeSnackbar()), 3000);
    }
  }, [Snackbar, dispatch, message, variant, snackbar]);

  //Redirect to play when success
  useEffect(() => {
    if (data) AuthStorage.set(data, () => history.push('/play'));
    return () => {
      dispatch(actions.reset());
    };
  }, [history, data, dispatch, AuthStorage]);

  //====================================== Callback ======================================
  const onShowPassword = () => setShowPassword(!showPassword);
  const onSubmit = values => {
    dispatch(actions.login(values));
  };
  //====================================== Render ======================================
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Formik initialValues={{ studentCode: '', password: '' }} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ errors, touched, setFieldTouched }) => (
            <Form autoComplete="off">
              <Typography variant="h5" component="h5" className={classes.text}>
                ĐĂNG NHẬP
              </Typography>
              <div className={classes.inputWrapper}>
                <Field
                  as={TextField}
                  error={!!errors.studentCode && !!touched.studentCode}
                  name="studentCode"
                  variant="outlined"
                  label="Mã Sinh Viên"
                  onFocus={() => setFieldTouched('studentCode', true)}
                  helperText={errors.studentCode}
                  className={classes.input}
                />
              </div>
              <div className={classes.inputWrapper}>
                <Field
                  as={TextField}
                  error={!!errors.password && !!touched.password}
                  name="password"
                  variant="outlined"
                  type={showPassword ? 'text' : 'password'}
                  label="Mật Khẩu"
                  helperText={errors.password}
                  onFocus={() => setFieldTouched('password', true)}
                  className={classes.input}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton aria-label="toggle password visibility" className={classes.hideIcon} onClick={onShowPassword}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div className={classes.buttonBox}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  type="submit"
                  disabled={loading || !!errors.password || !!errors.studentCode || !!!touched.password || !!!touched.studentCode}
                >
                  {!loading ? 'ĐĂNG NHẬP' : <CircularProgress size={15} />}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Paper>
    </div>
  );
}
