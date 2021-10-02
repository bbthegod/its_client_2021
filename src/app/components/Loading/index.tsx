/*
 *
 * Loading
 *
 */
import { Ripple } from 'react-spinners-css';

import classes from './styles.module.css';

interface Props {}

export default function Loading(props: Props) {
  return (
    <div className={classes.root}>
      <Ripple color="#FF9800" />
    </div>
  );
}
