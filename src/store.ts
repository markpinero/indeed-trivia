import { configureStore } from '@reduxjs/toolkit';
import quizSlice from './features/quiz/quizSlice';
import timerSlice from './features/timer/timerSlice';

const store = configureStore({
  reducer: {
    quiz: quizSlice.reducer,
    timer: timerSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
