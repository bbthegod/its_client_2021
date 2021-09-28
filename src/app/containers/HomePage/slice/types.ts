/*
 *
 * HomePage State
 *
 */
export interface HomePageState {
  playData: PlayData | undefined;
  loading: boolean;
  success: boolean;
  failures: boolean;
}
