import { colors } from '@mui/material';

const white = '#FFFFFF';
const black = '#000000';
const whiteText = '#F5F5F5';
const darkText = '#000000';
const customPurple = '#6863CE';
const customGreen = '#FF9800';

const palette = {
  black,
  white,
  primary: {
    contrastText: white,
    main: customPurple,
  },
  secondary: {
    contrastText: white,
    main: customGreen,
  },
  success: {
    contrastText: white,
    dark: colors.green[900],
    main: colors.green[600],
    light: colors.green[400],
  },
  info: {
    contrastText: white,
    dark: colors.blue[900],
    main: colors.blue[600],
    light: colors.blue[400],
  },
  warning: {
    contrastText: white,
    dark: colors.orange[900],
    main: colors.orange[600],
    light: colors.orange[400],
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: '#cf6678',
    light: colors.red[400],
  },
  text: {
    primary: whiteText,
    secondary: whiteText,
    link: whiteText,
    dark: darkText,
  },
  background: {
    default: '#1f1f1f',
    paper: '#1f1f1f',
  },
  icon: colors.blueGrey[600],
  divider: customPurple,
};

export default palette;
