import styled from 'styled-components';
import { useAppSelector } from '../hooks/index';
import VisuallyHidden from './VisuallyHidden';

export default function QuizScore() {
  const score = useAppSelector((state) => state.quiz.currentScore);
  const questionCount = useAppSelector((state) => state.quiz.questionCount);

  return (
    <Container>
      Score: {score} <VisuallyHidden>of {questionCount}</VisuallyHidden>
    </Container>
  );
}

const Container = styled.div`
  font-weight: bold;

  @media (min-width: 768px) {
    font-size: 1.25rem;
  }
`;
