/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'authToken',
  initialState: {
    authenticated: false,
    userId: null,
    accessToken: null,
    expireTime: null,
    // userName: '',
    // email: null,
  },
  // Refresh Token 은 브라우저 저장소(cookie)에, Access Token은 Redux를 이용하여 store에 사용.
  reducers: {
    SET_TOKEN: (state, action) => {
      // action: {
      //     payload: { authenticated: true, userName: id, role: --- }
      // }
      state.authenticated = true;
      state.userId = action.payload.userId;
      state.accessToken = action.payload.accessToken;
      state.expireTime = action.payload.acExpireDate// ms 단위임.
      // state.expireTime = new Date(action.payload.acExpireDate).getTime() // 다시 ms 단위로 변환
      // state.userName = action.payload.userName;
      // state.email = action.payload.email;
    },
    DELETE_TOKEN: state => {
      state.authenticated = false;
      state.userId = null;
      state.accessToken = null;
      state.expireTime = null;
      // state.userName = '';
      // state.email = '';
    },
  },
});

export const { SET_TOKEN, DELETE_TOKEN } = authSlice.actions;
export default authSlice.reducer;
