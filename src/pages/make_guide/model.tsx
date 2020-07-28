export default {
  namespace: 'make',
  state: {
    routes: [],
  },
  effects: {
    *addRoute({ payload }, { put }) {
      yield put({
        type: 'route',
        payload
      });
    },
  },
  reducers: {
    'route'(state, action) {
      state.routes.push(action.payload);
    },
  }
}