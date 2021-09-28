/*
 *
 * ReadyPage State
 *
 */
export interface ReadyPageState {
  playData: PlayData | undefined;
  loading: boolean;
  success: boolean;
  failures: boolean;
}
