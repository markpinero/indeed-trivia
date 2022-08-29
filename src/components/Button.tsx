import styled from 'styled-components';

export interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  type?: 'submit' | 'reset' | 'button';
}

export default function Button({ children, ...props }: Props) {
  return <StyledButton {...props}>{children}</StyledButton>;
}

const StyledButton = styled.button`
  background-color: var(--color-blue);
  border: 0;
  border-radius: 4px;
  color: #fff;
  font-weight: bold;
  padding: 1em 1.5em;
`;
