import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAppSelector } from '../hooks/index';

const MAX_QUIZ_TIME = 1000 * 60 * 5;

export default function QuizTImer() {
  const navigate = useNavigate();
  const timerStatus = useAppSelector((state) => state.timer.status);
  const timeStarted = useAppSelector((state) => state.timer.timeStarted);
  const intervalRef = useRef<ReturnType<typeof window.setInterval>>();
  const [currentTime, setCurrentTime] = useState<number>(Date.now());

  const timeLeft = MAX_QUIZ_TIME - (currentTime - timeStarted);
  const timeLeftFormatted = new Date(timeLeft).toISOString().substring(14, 19);
  const isTimerExceeded = timeLeft <= 0;

  useEffect(() => {
    if (timerStatus === 'started') {
      intervalRef.current = setInterval(() => setCurrentTime(Date.now()), 1000);
    } else {
      clearInterval(intervalRef.current);
    }
  }, [timerStatus]);

  useEffect(() => {
    if (isTimerExceeded && timerStatus === 'started') {
      navigate('/result');
    }
  }, [isTimerExceeded, timerStatus, navigate]);

  return <Container role='timer'>Time Left: {timeLeftFormatted}</Container>;
}

const Container = styled.div`
  @media (min-width: 768px) {
    margin-top: 1rem;
  }
`;
