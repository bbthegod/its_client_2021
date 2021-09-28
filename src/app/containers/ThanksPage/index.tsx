/*
 *
 * ThanksPage
 *
 */
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import classes from './styles.module.css';

interface Props {}

export default function ThanksPage(props: Props) {
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography className={classes.text}>HẾT GIỜ ! CẢM ƠN BẠN ĐÃ THAM GIA PHỎNG VẤN CÙNG IT SUPPORTER ❤️</Typography>
      </Paper>
    </div>
  );
}
