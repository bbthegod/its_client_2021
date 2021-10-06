/*
 *
 * Asynchronously loads the component for ConfirmDialog
 *
 */
import { lazyLoad } from 'utils/loadable';

export default lazyLoad(() => import('./index'));
