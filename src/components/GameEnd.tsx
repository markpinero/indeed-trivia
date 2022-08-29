import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import type { HighScore } from '../features/quiz/quizSlice';
import { resetQuiz } from '../features/quiz/quizSlice';
import { resetTimer, stopTimer } from '../features/timer/timerSlice';
import { useAppDispatch, useAppSelector } from '../hooks/index';
import BaseLayout from './BaseLayout';
import Button from './Button';

const RESULTS = {
  low: {
    src: 'https://thumbs.dreamstime.com/b/better-luck-next-time-rubber-stamp-over-white-background-88415080.jpg',
    title: `Better luck next time!`,
  },
  high: {
    src: 'https://media.istockphoto.com/vectors/congratulations-greeting-card-vector-lettering-vector-id1199025903?k=20&m=1199025903&s=612x612&w=0&h=f58ZLBcPziVXtX-7PzLm93tfPqVxDtb71tfl2PGQLI8=',
    title: `You're a Trivia master!`,
  },
};

export default function GameEnd() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const score = useAppSelector((state) => state.quiz.currentScore);
  const [existingHighScore, setExistingHighScore] = useState<HighScore>();
  const questionCount = useAppSelector((state) => state.quiz.questionCount);

  const { src, title } = RESULTS[score >= 3 ? 'high' : 'low'];

  const playAgain = () => {
    dispatch(resetQuiz());
    dispatch(resetTimer());
    navigate('/quiz');
  };

  useEffect(() => {
    dispatch(stopTimer());
  }, [dispatch]);

  useEffect(() => {
    const highScore = localStorage.getItem('trivia-high-score');
    const parsedHighScore: HighScore = JSON.parse(highScore as string);

    if (parsedHighScore) {
      setExistingHighScore(parsedHighScore);
    }

    if (!parsedHighScore || score > Number(existingHighScore?.score)) {
      localStorage.setItem(
        'trivia-high-score',
        JSON.stringify({
          score,
          questionCount,
          date: Date.now(),
        } as HighScore)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BaseLayout>
      <Container>
        <Img src={src} alt='' />
        <h1>{title}</h1>
        <div>
          You got {score} out of {questionCount} questions right!
        </div>
        {existingHighScore ? (
          <div>
            Your best score so far was {existingHighScore.score} out of{' '}
            {existingHighScore.questionCount} which you got on{' '}
            {new Date(existingHighScore.date).toLocaleDateString()}.
          </div>
        ) : (
          <div>This is your best score!</div>
        )}
        <div>
          <Button onClick={playAgain}>Play Again!</Button>
        </div>
      </Container>
    </BaseLayout>
  );
}

const Container = styled.div`
  text-align: center;

  > * + * {
    margin-top: 1rem;
  }
`;

const Img = styled.img`
  max-width: 400px;
`;
