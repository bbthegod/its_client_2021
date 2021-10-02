/*
 *
 * HomePage
 *
 */
import { useEffect, useState, useContext, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Paper } from '@mui/material';
import { useHistory } from 'react-router-dom';
import io from 'socket.io-client';

import AuthStorageContext from 'context/AuthStorageContext';
import QuestionContent from './components/QuestionContent';
import ControlButtons from './components/ControlButtons';
import QuestionList from './components/QuestionList';
import Loading from 'app/components/Loading';
import SnackbarContext from 'context/SnackbarContext';
import { selectHomePage } from './slice/selectors';
import { SOCKET_URL } from 'constants/url';
import classes from './styles.module.css';
import { actions } from './slice';

interface Props {}

const socket = io(SOCKET_URL);

export default function HomePage(props: Props) {
  //====================================== State ======================================
  const [question, setQuestion] = useState<Question>();
  const [index, setIndex] = useState(0);
  //====================================== Hooks ======================================
  const { playData, loading } = useSelector(selectHomePage);
  const AuthStorage = useContext(AuthStorageContext);
  const Snackbar = useContext(SnackbarContext);
  const dispatch = useDispatch();
  const history = useHistory();
  //====================================== Const ======================================
  const auth = AuthStorage.get();
  const token = useMemo(() => auth?.token, [auth]);
  //====================================== Effect ======================================

  //Login into socket and get data in the first time render
  useEffect(() => {
    socket.emit('login', { command: 1000, token });
    dispatch(actions.get());
    return () => {
      socket.disconnect();
    };
  }, [dispatch, token]);

  //Checking time out of current play session
  useEffect(() => {
    if (playData && playData.timeOut) {
      setQuestion(playData.questions[index].questionId);
      if (new Date(playData.timeOut).getTime() - new Date(Date.now()).getTime() <= 0) {
        socket.disconnect();
        history.push('/thanks');
      }
    }
  }, [playData, index, history]);

  //====================================== Callback ======================================

  //Previous question
  const previous = () => {
    if (index > 0) setIndex(index - 1);
  };

  //Next question
  const next = () => {
    if (playData && index < playData.questions.length - 1) setIndex(index + 1);
  };

  //Select question
  const selectQuestion = idx => setIndex(idx);

  //Anwser a question and send it through socket
  const answerQuestion = numbering => {
    if (numbering !== '') {
      socket.emit('question', {
        command: 2001,
        token,
        data: { index, answer: numbering },
      });
      dispatch(actions.get());
    }
  };

  //====================================== Socket ======================================

  //Display a snackbar when something error in socket
  socket.on('error', () => Snackbar.open('Có lỗi khi gửi câu trả lời', 'error'));

  //====================================== Render ======================================
  return !loading && playData && question ? (
    <div className={classes.root}>
      <Paper className={classes.content}>
        <QuestionContent question={question} playData={playData} index={index} answerQuestion={answerQuestion} />
        <ControlButtons next={next} previous={previous} disabledPrev={index === 0} disabledNext={index === playData?.questions?.length - 1} />
      </Paper>
      <Paper className={classes.list}>
        <QuestionList playData={playData} selectQuestion={selectQuestion} />
      </Paper>
    </div>
  ) : (
    <Loading />
  );
}
