import React from 'react';

export default React.createContext({
  get: (): undefined | AuthStorage => undefined,
  set: (data: AuthStorage, callback: Function): void => {},
});
