import type { RefCallback } from 'react';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import type { RootState } from '../store';

export interface IQuestion {
  id: number;
  question: string;
  correctAnswers: number[];
  answers: { id: number; answer: string }[];
}

export interface Props {
  question: IQuestion;
  questionNumber: number;
}

export default function Question({ question, questionNumber }: Props) {
  const questionCount = useSelector(
    (state: RootState) => state.quiz.questionCount
  );

  const legendRef = useCallback<RefCallback<HTMLElement>>((node) => {
    if (node !== null) {
      node.focus();
    }
  }, []);

  return (
    <legend ref={legendRef} tabIndex={-1}>
      <StyledQuestionCount>
        Question {questionNumber} of {questionCount}:
      </StyledQuestionCount>
      <StyledQuestionText>{question.question}</StyledQuestionText>
    </legend>
  );
}

const StyledQuestionCount = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
`;

const StyledQuestionText = styled.div`
  margin-top: 1rem;
  max-width: 60ch;
`;
