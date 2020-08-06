import api from '@/services';

const { getGuideTypes, getPoiTypes } = api;

export default {
  namespace: 'guide',
  state: {
    guide: null,
    routes: [],
    guideTypes: [],
    poiTypes: [],
    routeIndex: -1,
  },
  effects: {
    *setGuide({ payload }, { put }) {
      yield put({
        type: 'set_guide',
        payload,
      });
    },
    *addRoute({ payload }, { put }) {
      yield put({
        type: 'add_route',
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
    set_guide(state, action) {
      state.guide = action.payload;
    },
    add_route(state, action) {
      state.guide.Routes.push(action.payload);
    },
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
      if (state.guide.Routes[index].Pois)
        state.guide.Routes[index].Pois.push(poi);
      else state.guide.Routes[index].Pois = [poi];
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
