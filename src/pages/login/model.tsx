import api from '@/services';

const { login } = api;

export default {
  namespace: 'login',
  state: {
    user: null,
    token: null,
  },
  effects: {
    *login({ payload }, { call, put }) {
      const res = yield call(login, payload);
      if (res.success) {
        yield put({
          type: 'user',
          payload: res.data,
        });
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
      history.listen(({ pathname }) => {});
    },
  },
};
