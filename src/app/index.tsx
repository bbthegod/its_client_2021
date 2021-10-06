import { useState } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import '../assets/styles/style.css';
import '../assets/styles/style.scss';

import NotFoundPage from 'app/components/NotFoundPage/loadable';
import PrivateRoute from 'app/components/PrivateRoute/loadable';
import AuthStorage from 'app/components/AuthStorage/loadable';
import Snackbar from 'app/components/Snackbar/loadable';
import SideBar from 'app/components/SideBar/loadable';
import Header from 'app/components/Header/loadable';
//= ======================================================================
import ThanksPage from 'app/containers/ThanksPage/loadable';
import LoginPage from 'app/containers/LoginPage/loadable';
import ReadyPage from 'app/containers/ReadyPage/loadable';
import HomePage from 'app/containers/HomePage/loadable';
import theme from 'assets/theme/index';

export default function App() {
  const [open, setOpen] = useState(false);
  function toggleSidbar() {
    setOpen(!open);
  }
  return (
    <div style={{ backgroundColor: '#121212', minHeight: '100vh' }}>
      <BrowserRouter>
        <AuthStorage>
          <Snackbar>
            <ThemeProvider theme={theme}>
              <SideBar isOpen={open} toggleSidbar={toggleSidbar} />
              <Header toggleSidbar={toggleSidbar} />
              <Switch>
                <Route exact path="/" component={LoginPage} />
                <Route path="/login" component={LoginPage} />
                <PrivateRoute path="/play" component={ReadyPage} />
                <PrivateRoute path="/playing" component={HomePage} />
                <PrivateRoute path="/thanks" component={ThanksPage} />
                <Route component={NotFoundPage} />
              </Switch>
            </ThemeProvider>
          </Snackbar>
        </AuthStorage>
      </BrowserRouter>
    </div>
  );
}
