/*
 *
 * Asynchronously loads the component for Header
 *
 */
import { lazyLoad } from 'utils/loadable';

export default lazyLoad(() => import('./index'));
