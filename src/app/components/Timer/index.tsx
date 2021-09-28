/*
 *
 * Timer
 *
 */
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface Props {
  time: any;
  className: any;
}

function format(time) {
  let seconds: number = +Math.floor(time % 60);
  let minutes: number = +Math.floor(time / 60);
  minutes = minutes.toString().length === 1 ? +`0${minutes}` : minutes;
  seconds = seconds.toString().length === 1 ? +`0${seconds}` : seconds;
  return `${minutes}:${seconds}`;
}

export default function Timer({ time, className }: Props) {
  //====================================== State ======================================
  const [currentTime, setCurrentTime] = useState(Math.floor((new Date(time).getTime() - new Date(Date.now()).getTime()) / 1000));
  //====================================== Hooks ======================================
  const history = useHistory();
  //====================================== Effect ======================================
  useEffect(() => {
    setCurrentTime(Math.floor((new Date(time).getTime() - new Date(Date.now()).getTime()) / 1000));
    if (currentTime <= 0) history.push('/thanks');
    const inter = setInterval(() => {
      setCurrentTime(Math.floor((new Date(time).getTime() - new Date(Date.now()).getTime()) / 1000));
    }, 1000);
    return () => {
      clearInterval(inter);
    };
  }, [currentTime, history, time]);
  //====================================== Render ======================================
  return (
    <div className={className}>
      <span style={{ fontSize: '30px', color: 'white', fontWeight: 'bold', fontFamily: 'Open Sans, sans-serif' }}>{format(currentTime)}</span>
    </div>
  );
}
