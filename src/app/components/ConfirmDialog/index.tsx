/*
 *
 * ConfirmDialog
 *
 */
import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';

interface Props {
  message: string;
  open: boolean;
  setOpen: Function;
  handleAction: Function;
}

export default function ConfirmDialog({ message, setOpen, open, handleAction }: Props) {
  //====================================== Callback ======================================
  const handleClose = () => {
    setOpen(false);
  };

  const clickAction = () => {
    handleAction();
    setOpen(false);
  };
  //====================================== Render ======================================
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Huỷ
        </Button>
        <Button onClick={clickAction} color="primary" autoFocus>
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
}
