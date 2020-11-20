import api from '@/services';
import { message } from 'antd';
import { history } from 'umi';

const { addGuide, getGuides, putGuide, removeGuide } = api;

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
    *addGuide(_, { call }) {
      const res = yield call(addGuide);
      if (res.success) {
        history.push(`/guide/${res.data.id}`);
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
    *removeGuide({ payload }, { call, put }) {
      const res = yield call(removeGuide, payload);
      if (res.success) {
        yield put({ type: 'setGuides' });
        message.success(res.data.message);
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
          dispatch({ type: 'guide/setGuide', payload: null });
        }
        if ('/poi' === pathname || '/guide' === pathname) {
          dispatch({ type: 'guide/setGuideTypes' });
          dispatch({ type: 'guide/setPoiTypes' });
        }
      });
    },
  },
};
