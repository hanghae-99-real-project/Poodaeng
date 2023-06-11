/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const timerSlice = createSlice({
  name: 'timer',
  initialState: {
    verification :{
      expireAt: 0,
    }
  },
  reducers: {
    SET_TIMER: (state, action) => {
      state.verification.expireAt = action.payload.expireAt;
    },
    RESET_TIMER: state => {
      state.verification.expireAt = 0
    },
  },
});

export const { SET_TIMER, RESET_TIMER } = timerSlice.actions;
export default timerSlice.reducer;
