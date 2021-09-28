/*
 *
 * LoginPage State
 *
 */
export interface LoginPageState {
  data: AuthStorage | undefined;
  loading: boolean;
  success: boolean;
  failures: boolean;
  snackbar: boolean;
  variant: string;
  message: string;
}
