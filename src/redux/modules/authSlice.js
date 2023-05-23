/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'authToken',
  initialState: {
    authenticated: false,
    userName: '',
    role: '',
    email: null,
    userId: null,
    // accessToken: null,
    // expireTime: null,
  },
  // Refresh Token 은 브라우저 저장소(cookie)에, Access Token은 Redux를 이용하여 store에 사용.
  reducers: {
    SET_TOKEN: (state, action) => {
      // action: {
      //     payload: { authenticated: true, userName: id, role: --- }
      // }
      state.authenticated = true;
      state.userName = action.payload.userName;
      state.role = action.payload.role;
      state.email = action.payload.email;
      state.userId = action.payload.userId;
      // state.accessToken = action.payload;
      // state.expireTime = new Date().getTime()
    },
    DELETE_TOKEN: state => {
      state.authenticated = false;
      state.userName = '';
      state.role = '';
      state.email = '';
      state.userId = null;
      // state.accessToken = null;
      // state.expireTime = null;
    },
  },
});

export const { SET_TOKEN, DELETE_TOKEN } = authSlice.actions;
export default authSlice.reducer;
