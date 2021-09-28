/*
 *
 * Asynchronously loads the component for Snackbar
 *
 */
import { lazyLoad } from 'utils/loadable';

export default lazyLoad(() => import('./index'));
