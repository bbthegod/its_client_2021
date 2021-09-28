/*
 *
 * Header
 *
 */
import { AppBar, Toolbar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import Logo from 'assets/images/logo.png';
import classes from './styles.module.css';

interface Props {
  toggleSidbar: Function;
}

export default function Header({ toggleSidbar }: Props) {
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.header}>
        <Toolbar>
          <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => toggleSidbar()}>
            <MenuIcon className={classes.icon} />
          </IconButton>
          <img src={Logo} className={classes.logo} alt="Logo" />
        </Toolbar>
      </AppBar>
    </div>
  );
}
