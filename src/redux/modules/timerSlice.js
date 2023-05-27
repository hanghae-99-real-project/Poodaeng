/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const timerSlice = createSlice({
  name: 'timer',
  initialState: {
    verification :{
      expireAt: null,
    }
  },
  reducers: {
    SET_TIMER: (state, action) => {
      // action: {
      //     payload: { authenticated: true, userName: id, role: --- }
      // }
      state.verification.expireAt = action.payload.expireAt;
      // state.accessToken = action.payload;
      // state.expireTime = new Date().getTime()
    },
    RESET_TIMER: state => {
      state.verification.expireAt = null
      // state.accessToken = null;
      // state.expireTime = null;
    },
  },
});

export const { SET_TIMER, RESET_TIMER } = timerSlice.actions;
export default timerSlice.reducer;
