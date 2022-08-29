import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

type TimerState = {
  status: 'stopped' | 'started';
  timeStarted: number;
};

const initialState: TimerState = {
  status: 'stopped',
  timeStarted: 0,
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    resetTimer(state) {
      Object.assign(state, initialState);
    },

    startTimer(state) {
      state.status = 'started';
      state.timeStarted = Date.now();
    },

    stopTimer(state) {
      state.status = 'stopped';
    },
  },
});

export const { resetTimer, startTimer, stopTimer } = timerSlice.actions;

export const timeStarted = (state: RootState) => state.timer.timeStarted;

export default timerSlice;
