import React from 'react';

export default React.createContext({
  open: (message: string, variant: string): void => undefined,
});
