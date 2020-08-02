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
        payload
      });
    },
    *setGuideTypes({ payload }, { put }) {
      yield put({
        type: 'guideTypes',
        payload
      });
    },
    *setPoiTypes({ payload }, { put }) {
      yield put({
        type: 'poiTypes',
        payload
      });
    },
    *setRouteIndex({ payload }, { put }) {
      yield put({
        type: 'routeIndex',
        payload
      });
    },
    *updateRoute({ payload }, { put }) {
      yield put({
        type: 'routePoi',
        payload
      });
    },
  },
  reducers: {
    'routes'(state, action) {
      state.routes.push(action.payload);
    },
    'guideTypes'(state, action) {
      state.guideTypes = action.payload;
    },
    'poiTypes'(state, action) {
      state.poiTypes = action.payload;
    },
    'routeIndex'(state, action) {
      state.routeIndex = action.payload;
    },
    'routePoi'(state, action) {
      const { index, poi } = action.payload;
      state.routes[index].pois.push(poi);
    },
  }
}