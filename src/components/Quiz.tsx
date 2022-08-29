import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { QUESTIONS as questions } from '../constants/questions';
import { setQuestionCount } from '../features/quiz/quizSlice';
import { startTimer } from '../features/timer/timerSlice';
import { useAppDispatch, useAppSelector } from '../hooks/index';
import BaseLayout from './BaseLayout';
import QuizForm from './QuizForm';
import QuizScore from './QuizScore';
import QuizTimer from './QuizTimer';
import VisuallyHidden from './VisuallyHidden';

export default function Quiz() {
  const [started, setStarted] = useState(false);
  const questionNumber = useAppSelector((state) => state.quiz.currentQuestion);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setQuestionCount(questions.length));
    dispatch(startTimer());

    setStarted(true);
  }, [dispatch]);

  if (!started) {
    <BaseLayout>
      <div>Loading...</div>
    </BaseLayout>;
  }

  return (
    <BaseLayout>
      <VisuallyHidden>
        <h1>Quiz</h1>
      </VisuallyHidden>
      <Container>
        <QuizForm
          key={questionNumber}
          questionNumber={questionNumber}
          questions={questions}
        />
        <Aside>
          <QuizScore />
          <QuizTimer />
        </Aside>
      </Container>
    </BaseLayout>
  );
}

const Container = styled.div`
  display: grid;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: 3fr 1fr;
  }
`;

const Aside = styled.aside`
  display: flex;
  justify-content: space-between;

  @media (min-width: 768px) {
    flex-direction: column;
    justify-content: flex-start;
    text-align: right;
  }
`;
