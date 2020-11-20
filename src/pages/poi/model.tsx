import api from '@/services';
import { notification, message } from 'antd';

const { addPoi, getPois } = api;

export default {
  namespace: 'poi',
  state: {
    searchPois: [],
    pois: [],
    poi: null,
  },
  effects: {
    *setPois(_, { call, put }) {
      const res = yield call(getPois);
      if (res.success) {
        yield put({
          type: 'pois',
          payload: res.data,
        });
      }
    },
    *setPoi({ payload }, { put }) {
      yield put({
        type: 'poi',
        payload,
      });
    },
    *addPoi({ payload }, { call, put }) {
      const res = yield call(addPoi, payload);
      if (res.success) {
        message.success({
          message: '添加成功',
        });
        yield put({ type: 'setPois', payload: [] });
      } else {
        notification.error({
          message: '添加失败',
          description: res.message,
        });
      }
    },
  },
  reducers: {
    pois(state, action) {
      state.pois = action.payload;
    },
    poi(state, action) {
      state.poi = action.payload;
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if ('/guide' === pathname || '/poi' === pathname) {
          dispatch({ type: 'setPois', payload: [] });
        }
      });
    },
  },
};
