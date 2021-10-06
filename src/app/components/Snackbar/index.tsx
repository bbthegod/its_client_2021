/*
 *
 * Snackbar
 *
 */
import { SnackbarProvider } from 'notistack';
import { useRef } from 'react';

import SnackbarContext from 'context/SnackbarContext';

interface Props {
  children: any;
}

export default function Snackbar(props: Props) {
  //====================================== Hooks ======================================
  const providerRef = useRef<any>();
  //====================================== Callback ======================================
  const open = (message: string, variant: string) => {
    providerRef.current.enqueueSnackbar(message, { variant: variant });
  };
  //====================================== Render ======================================
  return (
    <SnackbarContext.Provider value={{ open }}>
      <SnackbarProvider maxSnack={3} autoHideDuration={3000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} ref={providerRef}>
        {props.children}
      </SnackbarProvider>
    </SnackbarContext.Provider>
  );
}
