import styled from 'styled-components';

export interface Props {
  children: React.ReactNode;
}

export default function VisuallyHidden({ children }: Props) {
  return <Container>{children}</Container>;
}

const Container = styled.div`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;
