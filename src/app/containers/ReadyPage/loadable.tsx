/*
 *
 * Asynchronously loads the component for ReadyPage
 *
 */
import { lazyLoad } from 'utils/loadable';

export default lazyLoad(() => import('./index'));
