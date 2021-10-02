/*
 *
 * ReadyPage
 *
 */
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

import { Paper, Typography, Button } from '@mui/material';
import { selectReadyPage } from './slice/selectors';
import Loading from 'app/components/Loading';
import classes from './styles.module.css';
import { actions } from './slice';

interface Props {}

export default function ReadyPage(props: Props) {
  //====================================== Hooks ======================================
  const { playData, loading } = useSelector(selectReadyPage);
  const dispatch = useDispatch();
  const history = useHistory();
  //====================================== Effect ======================================
  useEffect(() => {
    dispatch(actions.get());
  }, [dispatch]);
  useEffect(() => {
    if (playData && playData.timeOut) {
      if (new Date(playData.timeOut).getTime() - new Date(Date.now()).getTime() <= 0) {
        history.push('/thanks');
      } else {
        history.push('/playing');
      }
    }
  }, [playData, history]);
  //====================================== Callback ======================================
  const handleReady = () => {
    if (playData && playData.timeOut) {
      dispatch(actions.get());
    } else {
      dispatch(actions.start());
    }
  };
  //====================================== Render ======================================
  return !loading ? (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h5" component="h5" className={classes.text}>
          CHUẨN BỊ
        </Typography>
        <Typography variant="h6" gutterBottom>
          - Chọn 1 đáp án duy nhất.
        </Typography>
        <Typography variant="h6" gutterBottom>
          - Thời gian làm bài là 25 phút (Tính cả thời gian không truy cập trang web)
        </Typography>
        <Typography variant="h6" gutterBottom>
          - Bạn có tạm thời bỏ qua câu hỏi và bạn cũng có thể kéo xuống dưới để chọn lại câu chưa trả lời.
        </Typography>
        <Typography variant="h6" gutterBottom>
          - Phải trả lời hết và không nên để trống câu hỏi nào.
        </Typography>
        <Typography variant="h6" gutterBottom>
          - Tổng điểm sẽ được tính cùng vào điểm khi phỏng vấn.
        </Typography>
        <Typography variant="h5" gutterBottom className={classes.lucky}>
          IT SUPPORTER CHÚC CÁC BẠN MAY MẮN ❤️
        </Typography>
        <div className={classes.buttonBox}>
          <Button variant="contained" className={classes.button} onClick={handleReady} color="primary">
            BẮT ĐẦU
          </Button>
        </div>
      </Paper>
    </div>
  ) : (
    <Loading />
  );
}
