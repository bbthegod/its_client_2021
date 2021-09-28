/*
 *
 * Asynchronously loads the component for ThanksPage
 *
 */
import { lazyLoad } from 'utils/loadable';

export default lazyLoad(() => import('./index'));
