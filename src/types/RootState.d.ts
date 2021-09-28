import { HomePageState } from 'app/containers/HomePage/slice/types';
import { LoginPageState } from 'app/containers/LoginPage/slice/types';
import { ReadyPageState } from 'app/containers/ReadyPage/slice/types';
// GENERATE NEW CONTAINER STATE ABOVE, DO NOT DELETE IT

interface RootState {
  homePage?: HomePageState;
  loginPage?: LoginPageState;
  readyPage?: ReadyPageState;
  // GENERATE NEW REDUCER KEY ABOVE, DO NOT DELETE IT
}
