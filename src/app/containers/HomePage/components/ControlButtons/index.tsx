/*
 *
 * ControlButtons
 *
 */
import Button from '@mui/material/Button';
import classes from './styles.module.css';

interface Props {
  next: Function;
  previous: Function;
  disabledPrev: boolean;
  disabledNext: boolean;
}

export default function ControlButtons({ previous, next, disabledPrev, disabledNext }: Props) {
  return (
    <div className={classes.root}>
      <Button variant="contained" className={classes.next} onClick={() => previous()} disabled={disabledPrev} color="primary">
        TRƯỚC
      </Button>
      <Button variant="contained" className={classes.prev} onClick={() => next()} disabled={disabledNext} color="primary">
        SAU
      </Button>
    </div>
  );
}
