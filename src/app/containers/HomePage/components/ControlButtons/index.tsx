/*
 *
 * ControlButtons
 *
 */
import { useState } from 'react';
import Button from '@mui/material/Button';

import ConfirmDialog from 'app/components/ConfirmDialog';
import classes from './styles.module.css';

interface Props {
  next: Function;
  previous: Function;
  end: Function;
  disabledPrev: boolean;
  disabledNext: boolean;
}

export default function ControlButtons({ previous, next, end, disabledPrev, disabledNext }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <div className={classes.root}>
      <Button variant="contained" className={classes.sideButton} onClick={() => previous()} disabled={disabledPrev} color="primary">
        TRƯỚC
      </Button>
      <Button
        variant="contained"
        className={classes.centerButton}
        onClick={() => setOpen(true)}
        style={{ display: disabledNext ? 'block' : 'none' }}
        disabled={disabledPrev}
        color="primary"
      >
        KẾT THÚC
      </Button>
      <Button variant="contained" className={classes.sideButton} onClick={() => next()} disabled={disabledNext} color="primary">
        SAU
      </Button>
      <ConfirmDialog message="Bạn có muốn kết thúc vòng chơi ?" open={open} setOpen={setOpen} handleAction={end} />
    </div>
  );
}
