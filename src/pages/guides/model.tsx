import api from '@/services';

const { addGuide } = api;

export default {
  namespace: 'guides',
  state: {
    guide: null,
  },
  effects: {
    *addGuide(_, { call, put }) {
      const res = yield call(addGuide);
      if (res.success) {
        yield put({
          type: 'guide',
          payload: res.data,
        });
      }
    },
  },
  reducers: {
    guide(state, action) {
      state.guide = action.payload;
    },
  },
};
