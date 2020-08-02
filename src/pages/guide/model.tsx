import api from '@/services';

const { getGuideTypes, getPoiTypes } = api;

export default {
  namespace: 'guide',
  state: {
    routes: [],
    guideTypes: [],
    poiTypes: [],
    routeIndex: -1,
  },
  effects: {
    *addRoute({ payload }, { put }) {
      yield put({
        type: 'routes',
        payload,
      });
    },
    *setGuideTypes(_, { call, put }) {
      const res = yield call(getGuideTypes);
      if (res.success) {
        yield put({
          type: 'guideTypes',
          payload: res.data,
        });
      }
    },
    *setPoiTypes(_, { call, put }) {
      const res = yield call(getPoiTypes);
      if (res.success) {
        yield put({
          type: 'poiTypes',
          payload: res.data,
        });
      }
    },
    *setRouteIndex({ payload }, { put }) {
      yield put({
        type: 'routeIndex',
        payload,
      });
    },
    *updateRoute({ payload }, { put }) {
      yield put({
        type: 'routePoi',
        payload,
      });
    },
  },
  reducers: {
    routes(state, action) {
      state.routes.push(action.payload);
    },
    guideTypes(state, action) {
      state.guideTypes = action.payload;
    },
    poiTypes(state, action) {
      state.poiTypes = action.payload;
    },
    routeIndex(state, action) {
      state.routeIndex = action.payload;
    },
    routePoi(state, action) {
      const { index, poi } = action.payload;
      state.routes[index].pois.push(poi);
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if ('/guide' === pathname) {
          dispatch({ type: 'setGuideTypes' });
        }
        if ('/guide' === pathname || '/poi' === pathname) {
          dispatch({ type: 'setPoiTypes' });
        }
      });
    },
  },
};
