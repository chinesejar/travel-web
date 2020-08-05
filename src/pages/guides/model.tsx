import api from '@/services';

const { addGuide, getGuides } = api;

export default {
  namespace: 'guides',
  state: {
    guides: [],
    guide: null,
  },
  effects: {
    *setGuides(_, { call, put }) {
      const res = yield call(getGuides);
      if (res.success) {
        yield put({
          type: 'guides',
          payload: res.data,
        });
      }
    },
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
    guides(state, action) {
      state.guides = action.payload;
    },
    guide(state, action) {
      state.guide = action.payload;
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if ('/guide' === pathname) {
          dispatch({ type: 'setGuides' });
        }
      });
    },
  },
};
