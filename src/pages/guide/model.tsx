import api from '@/services';

const {
  getGuideTypes,
  getPoiTypes,
  getGuide,
  getRoutes,
  addRoute,
  putRoute,
  addRoutePoi,
  putRoutePoi,
} = api;

export default {
  namespace: 'guide',
  state: {
    guide: null,
    routes: [],
    route: null,
    routePoi: null,
    guideTypes: [],
    poiTypes: [],
  },
  effects: {
    *getGuide({ payload }, { call, put }) {
      const res = yield call(getGuide, payload);
      if (res.success) {
        yield put({
          type: 'get_guide',
          payload: res.data,
        });
      }
    },
    *getRoutes({ payload }, { call, put }) {
      const res = yield call(getRoutes, payload);
      if (res.success) {
        yield put({
          type: 'get_routes',
          payload: res.data,
        });
      }
    },
    *addRoute({ payload }, { call, put }) {
      const res = yield call(addRoute, payload);
      if (res.success) {
        yield put({
          type: 'set_route',
          payload: res.data,
        });
      }
    },
    *setRoute({ payload }, { put }) {
      yield put({
        type: 'set_route',
        payload,
      });
    },
    *putRoute({ payload }, { call, put }) {
      const res = yield call(putRoute, payload);
      if (res.success) {
        yield put({
          type: 'set_route',
          payload: null,
        });
      }
    },
    *addRoutePoi({ payload }, { call, put }) {
      const res = yield call(addRoutePoi, payload);
      if (res.success) {
        yield put({
          type: 'set_route_poi',
          payload: res.data,
        });
      }
    },
    *setRoutePoi({ payload }, { put }) {
      yield put({
        type: 'set_route_poi',
        payload,
      });
    },
    *putRoutePoi({ payload }, { call, put }) {
      const res = yield call(putRoutePoi, payload);
      if (res.success) {
        yield put({
          type: 'set_route_poi',
          payload: null,
        });
      }
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
    get_guide(state, action) {
      state.guide = action.payload;
    },
    get_routes(state, action) {
      state.routes = action.payload;
    },
    set_route(state, action) {
      state.route = action.payload;
    },
    set_route_poi(state, action) {
      state.routePoi = action.payload;
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
      if (state.guide.routes[index].pois)
        state.guide.routes[index].pois.push(poi);
      else state.guide.routes[index].pois = [poi];
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
