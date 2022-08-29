import styled from 'styled-components';

export default function BaseLayout(props: { children: React.ReactNode }) {
  return <Container>{props.children}</Container>;
}

const Container = styled.div`
  margin: 0 auto;
  max-width: 800px;
  padding: 2rem;

  @media (min-width: 768px) {
    padding: 3rem;
  }
`;
