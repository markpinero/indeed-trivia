import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { nextQuestion, updateScore } from '../features/quiz/quizSlice';
import { useAppDispatch, useAppSelector } from '../hooks/index';
import Answer from './Answer';
import Button from './Button';
import type { IQuestion } from './Question';
import Question from './Question';

export interface Props {
  questionNumber: number;
  questions: IQuestion[];
}

export default function QuizForm({ questionNumber, questions }: Props) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const questionCount = useAppSelector((state) => state.quiz.questionCount);
  const question = questions[questionNumber - 1];
  const [answer, setAnswer] = useState<number>();
  const [isCorrect, setIsCorrect] = useState<boolean>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isCorrect = question.correctAnswers.some(
      (correctAnswer) => correctAnswer === answer
    );
    setIsCorrect(isCorrect);
    dispatch(updateScore(isCorrect));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(Number(e.target.value));
  };

  const goNext = () => {
    if (questionNumber === questionCount) {
      navigate('/result');
    } else {
      dispatch(nextQuestion());
    }
  };

  return (
    <form method='post' onSubmit={handleSubmit}>
      <fieldset id={`q-${question.id}`}>
        <Question question={question} questionNumber={questionNumber} />
        <AnswerList>
          {question.answers.map((answer) => (
            <Answer
              key={answer.id}
              questionId={question.id}
              answer={answer}
              isDisabled={isCorrect !== undefined}
              onChange={handleChange}
            />
          ))}
        </AnswerList>
      </fieldset>
      <StyledResult isCorrect={isCorrect}>
        {isCorrect ? 'You got it right!' : 'Sorry, you got it wrong.'}
      </StyledResult>
      {isCorrect === undefined ? (
        <Button>Submit</Button>
      ) : (
        <>
          <Button type='button' onClick={goNext}>
            {questionNumber < questionCount
              ? 'Next Question'
              : 'Check Your Results'}
          </Button>
        </>
      )}
    </form>
  );
}

const AnswerList = styled.ol`
  margin-bottom: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5em;

  @media (min-width: 768px) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1em;
    list-style-type: none;

    > li {
      flex: 1 1 calc(50% - 0.5em);
    }
  }
`;

const StyledResult = styled.p<{ isCorrect: boolean | undefined }>`
  color: ${(props) => (props.isCorrect ? 'green' : 'red')};
  visibility: ${(props) =>
    props.isCorrect === undefined ? 'hidden' : 'visible'};
`;
