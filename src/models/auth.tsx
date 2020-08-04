import api from '@/services';
import store from 'store';
import { message } from 'antd';
import { history } from 'umi';

const { login, register, getUser } = api;

export default {
  namespace: 'auth',
  state: {
    user: store.get('user'),
    token: store.get('token'),
  },
  effects: {
    *setUser({ payload }, { call, put }) {
      const res = yield call(getUser);
      if (res.success) {
        store.set('user', res.data);
        yield put({
          type: 'user',
          payload: res.data,
        });
      }
    },
    *login({ payload }, { call, put }) {
      const res = yield call(login, payload);
      if (res.success) {
        message.success('登录成功');
        const { token } = res.data;
        store.set('token', token);
        yield put({
          type: 'token',
          payload: token,
        });
        yield put({ type: 'setUser' });
        history.goBack();
      }
    },
    *register({ payload }, { call, put }) {
      const res = yield call(register, payload);
      if (res.success) {
        message.success('注册成功');
        const { token } = res.data;
        store.set('token', token);
        yield put({
          type: 'token',
          payload: token,
        });
        yield put({ type: 'setUser' });
        history.goBack();
      }
    },
  },
  reducers: {
    user(state, action) {
      state.user = action.payload;
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/') {
          if (store.get('token')) {
            dispatch({ type: 'setUser' });
          }
        }
      });
    },
  },
};
