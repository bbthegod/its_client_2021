/*
 *
 * PrivateRoute
 *
 */

import { Route, Redirect } from 'react-router-dom';
import { useContext } from 'react';

import AuthStorageContext from 'context/AuthStorageContext';

export default function PrivateRoute({ component: InnerComponent, location, ...rest }) {
  //====================================== Hooks ======================================
  const AuthStorage = useContext(AuthStorageContext);
  //====================================== Const ======================================
  const auth = AuthStorage.get();
  //====================================== Render ======================================
  return (
    <Route
      {...rest}
      render={props => {
        if (auth) {
          return <InnerComponent {...props} />;
        }
        return <Redirect to={{ pathname: '/login', state: { from: location } }} />;
      }}
    />
  );
}
