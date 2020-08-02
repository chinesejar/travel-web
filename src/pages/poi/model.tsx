export default {
  namespace: 'poi',
  state: {
    poi: null,
  },
  effects: {
    *setPoi({ payload }, { put }) {
      yield put({
        type: 'poi',
        payload
      });
    },
  },
  reducers: {
    'poi'(state, action) {
      state.poi = action.payload;
    },
  }
}