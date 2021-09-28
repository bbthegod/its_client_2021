/*
 *
 * LoginPage
 *
 */
import { Paper, Button, Typography, InputAdornment, TextField, IconButton } from '@mui/material';
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
    .required('Trường này không được để trống !')
    .matches(/^[0-9]{10}$/, 'Mã sinh viên không hợp lệ, ví dụ: 2017604482'),
  password: Yup.string().required('Trường này không được để trống !'),
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

  //Open snackbar when login failed
  useEffect(() => {
    if (snackbar) {
      Snackbar.open(message, variant);
      setTimeout(() => {
        dispatch(actions.closeSnackbar());
      }, 2000);
    }
  }, [Snackbar, dispatch, message, variant, snackbar]);

  //Redirect to play when success
  useEffect(() => {
    if (data) {
      AuthStorage.set(data, () => {
        history.push('/play');
      });
    }
    return () => {
      dispatch(actions.reset());
    };
  }, [history, data, dispatch, AuthStorage]);

  //====================================== Callback ======================================
  const onShowPassword = () => setShowPassword(!showPassword);
  //====================================== Render ======================================
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Formik
          initialValues={{
            studentCode: '',
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={values => {
            dispatch(actions.login(values));
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <Typography variant="h5" component="h5" className={classes.text}>
                ĐĂNG NHẬP
              </Typography>
              <Field
                as={TextField}
                error={!!errors.studentCode && !!touched.studentCode}
                name="studentCode"
                className={classes.input}
                variant="outlined"
                label="Mã Sinh Viên"
                helperText={errors.studentCode}
              />
              <Field
                as={TextField}
                error={!!errors.password && !!touched.password}
                name="password"
                className={classes.input}
                variant="outlined"
                type={showPassword ? 'text' : 'password'}
                label="Mật Khẩu"
                helperText={errors.password}
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
              <div className={classes.buttonBox}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  type="submit"
                  disabled={loading || (!errors.studentCode && !touched.studentCode && !errors.password && !touched.password)}
                >
                  ĐĂNG NHẬP
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Paper>
    </div>
  );
}