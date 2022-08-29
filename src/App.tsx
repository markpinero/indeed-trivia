/** @jsxImportSource @emotion/react */
import { Route, Routes } from 'react-router-dom';
import GameEnd from './components/GameEnd';
import GameStart from './components/GameStart';
import Quiz from './components/Quiz';

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<GameStart />} />
      <Route path='/quiz' element={<Quiz />} />
      <Route path='/result' element={<GameEnd />} />
    </Routes>
  );
}
