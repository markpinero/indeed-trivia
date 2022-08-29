import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export type QuizAnswer = {
  questionId: number;
  answer: number;
};

export type HighScore = { score: number; questionCount: number; date: number };

type QuizState = {
  questionCount: number;
  currentQuestion: number;
  currentScore: number;
  currentAnswers: QuizAnswer[];
};

const initialState: QuizState = {
  questionCount: 0,
  currentQuestion: 1,
  currentScore: 0,
  currentAnswers: [],
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    resetQuiz: (state) => {
      Object.assign(state, initialState);
    },

    setQuestionCount: (state, action: PayloadAction<number>) => {
      state.questionCount = action.payload;
    },

    nextQuestion: (state) => {
      state.currentQuestion += 1;
    },

    updateScore(state, action: PayloadAction<boolean>) {
      state.currentScore = action.payload
        ? state.currentScore + 1
        : state.currentScore;
    },
  },
});

export const { resetQuiz, setQuestionCount, nextQuestion, updateScore } =
  quizSlice.actions;

export default quizSlice;
