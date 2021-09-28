import { createTheme } from '@mui/material/styles';

import palette from './palette';

const theme = createTheme({
  typography: { fontFamily: 'Open Sans, sans-serif' },
  palette,
  zIndex: {
    appBar: 1200,
    drawer: 1100,
  },
});

export default theme;
