/*
 *
 * SideBar
 *
 */
import { Dialog, Toolbar, AppBar, List, ListItemIcon, ListItemText, IconButton, ListItemButton, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AuthStorageContext from 'context/AuthStorageContext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';
import { useHistory } from 'react-router-dom';
import React, { useContext } from 'react';

import classes from './styles.module.css';

interface Props {
  isOpen: boolean;
  toggleSidbar: Function;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children?: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="right" ref={ref} {...props} />;
});

export default function SideBar({ isOpen, toggleSidbar }: Props) {
  //====================================== Hooks ======================================
  const AuthStorage = useContext(AuthStorageContext);
  const auth = AuthStorage.get();
  const history = useHistory();
  //====================================== Callback ======================================
  const goToQuiz = () => {
    history.push('/play');
    toggleSidbar();
  };

  const goToLogin = () => {
    if (auth) {
      history.push('/play');
    } else {
      history.push('/login');
    }
    toggleSidbar();
  };

  const logout = () => {
    toggleSidbar();
    localStorage.clear();
    history.push('/login');
  };
  //====================================== Render ======================================
  return (
    <Dialog className={classes.root} fullScreen open={isOpen} onClose={() => toggleSidbar()} TransitionComponent={Transition}>
      <AppBar className={classes.header}>
        <Toolbar>
          <IconButton color="inherit" onClick={() => toggleSidbar()}>
            <CloseIcon className={classes.headerIcon} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <List component="nav" className={classes.list}>
        <ListItemButton onClick={goToQuiz}>
          <ListItemIcon className={classes.iconBox}>
            <PlayArrowIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText primary="QUIZ" className={classes.text} />
        </ListItemButton>

        <ListItemButton onClick={goToLogin}>
          <ListItemIcon className={classes.iconBox}>
            <FavoriteIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText primary="ĐĂNG NHẬP" className={classes.text} />
        </ListItemButton>

        <ListItemButton onClick={logout}>
          <ListItemIcon className={classes.iconBox}>
            <ExitToAppIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText primary="ĐĂNG XUẤT" className={classes.text} />
        </ListItemButton>
      </List>
    </Dialog>
  );
}
