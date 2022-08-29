import { Link } from 'react-router-dom';
import styled from 'styled-components';
import BaseLayout from './BaseLayout';

export default function GameStart() {
  return (
    <BaseLayout>
      <Container>
        <Img
          src='https://media.istockphoto.com/vectors/trivia-word-made-with-colorful-hanging-letters-vector-id1303554344?k=20&m=1303554344&s=612x612&w=0&h=cT8WCC7JFrlNuJYPPuryWwmu9ldHNlfHSqGbDfJQzL4='
          alt=''
        />
        <h1>Are you a Trivia Master?</h1>
        <p>Try your best answering these questions!</p>
        <Link to='/quiz'>Let's Get Started</Link>
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
