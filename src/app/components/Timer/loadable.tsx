/*
 *
 * Asynchronously loads the component for Timer
 *
 */
import { lazyLoad } from 'utils/loadable';

export default lazyLoad(() => import('./index'));
