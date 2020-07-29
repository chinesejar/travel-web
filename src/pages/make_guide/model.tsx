export default {
  namespace: 'make',
  state: {
    routes: [],
    routeIndex: -1,
  },
  effects: {
    *addRoute({ payload }, { put }) {
      yield put({
        type: 'routes',
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
    'routeIndex'(state, action) {
      state.routeIndex = action.payload;
    },
    'routePoi'(state, action) {
      const { index, poi } = action.payload;
      state.routes[index].pois.push(poi);
    },
  }
}