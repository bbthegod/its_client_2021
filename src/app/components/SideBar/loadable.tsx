/*
 *
 * Asynchronously loads the component for SideBar
 *
 */
import { lazyLoad } from 'utils/loadable';

export default lazyLoad(() => import('./index'));
