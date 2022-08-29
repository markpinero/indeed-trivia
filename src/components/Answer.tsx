import { useId } from 'react';
import styled from 'styled-components';

export interface Props {
  questionId: number;
  answer: {
    id: number;
    answer: string;
  };
  isDisabled: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export default function Answer({
  questionId,
  answer,
  isDisabled,
  onChange,
}: Props) {
  const id = useId();
  return (
    <Container>
      <StyledInput
        type='radio'
        id={id}
        disabled={isDisabled}
        name={`question-${questionId}`}
        value={answer.id}
        onChange={onChange}
      />
      <label htmlFor={id}>{answer.answer}</label>
    </Container>
  );
}

const Container = styled.li`
  align-items: flex-start;
  display: flex;
  gap: 0.5em;
`;

// Adapted from Tailwind Forms
const StyledInput = styled.input`
  appearance: none;
  background-color: var(--color-white);
  border: 1px solid var(--color-outline);
  border-radius: 100%;
  display: inline-block;
  vertical-align: middle;
  background-origin: border-box;
  flex-shrink: 0;
  height: 1.5em;
  margin-top: 2px;
  padding: 0;
  width: 1.5em;

  &:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
    box-shadow: 0 0 0 2px var(--color-white), 0 0 0 4px var(--color-blue);
  }

  &:checked {
    border-color: transparent;
    background-color: var(--color-blue);
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='8' cy='8' r='3'/%3E%3C/svg%3E");
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;

    &:disabled {
      background-color: var(--color-outline);
    }
  }
`;
