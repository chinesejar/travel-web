import api from '@/services';
import { message } from 'antd';

const { addGuide, getGuides, putGuide } = api;

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
    *putGuide({ payload }, { call, put }) {
      const res = yield call(putGuide, payload);
      if (res.success) {
        yield put({
          type: 'guide',
          payload: res.data,
        });
        message.success('保存成功');
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
    put_guide(state, action) {
      state.guide = Object.assign(state.guide, action.payload);
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
