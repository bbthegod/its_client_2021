/**
 *
 * AuthStorage
 *
 */
import jwt from 'jsonwebtoken';
import { useHistory } from 'react-router-dom';

import AuthStorageContext from 'context/AuthStorageContext';

export default function AuthStorage(props) {
  //====================================== Hooks ======================================
  const history = useHistory();
  //====================================== Callback ======================================
  const get = () => {
    try {
      if (localStorage.getItem('auth')) {
        let decoded = jwt.verify(localStorage.getItem('auth'), 'shhhhh');
        return decoded;
      }
      return null;
    } catch (err) {
      localStorage.clear();
      history.push('/');
    }
  };

  const set = (data, callback) => {
    let auth = {
      token: data.token,
      studentCode: data.studentCode,
      role: data.image,
    };
    jwt.sign(auth, 'shhhhh', (err, token) => {
      if (!err) {
        localStorage.setItem('auth', token);
        callback();
      }
    });
  };
  //====================================== Render ======================================
  return <AuthStorageContext.Provider value={{ get, set }}>{props.children}</AuthStorageContext.Provider>;
}
