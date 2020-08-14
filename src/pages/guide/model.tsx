import api from '@/services';
import { message } from 'antd';

const {
  getGuideTypes,
  getPoiTypes,
  getGuide,
  getRoutes,
  addRoute,
  putRoute,
  removeRoute,
  addRoutePoi,
  putRoutePoi,
  removeRoutePoi,
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
          type: 'set_guide',
          payload: res.data,
        });
      }
    },
    *setGuide({ payload }, { put }) {
      yield put({
        type: 'set_guide',
        payload,
      });
    },
    *getRoutes(_, { call, put, select }) {
      const { guide } = yield select(_ => _.guide);
      if (guide) {
        const res = yield call(getRoutes, {
          query: { guide_id: guide.id },
        });
        if (res.success) {
          yield put({
            type: 'set_routes',
            payload: res.data,
          });
        }
      }
    },
    *setRoutes({ payload }, { put }) {
      yield put({
        type: 'set_routes',
        payload,
      });
    },
    *addRoute({ payload }, { call, put }) {
      const res = yield call(addRoute, payload);
      if (res.success) {
        yield put({
          type: 'set_route',
          payload: res.data,
        });
        yield put({ type: 'getRoutes' });
      }
    },
    *setRoute({ payload }, { put }) {
      yield put({ type: 'set_route', payload });
    },
    *putRoute({ payload }, { call, put }) {
      const res = yield call(putRoute, payload);
      if (res.success) {
        yield put({
          type: 'set_route',
          payload: null,
        });
        yield put({ type: 'getRoutes' });
      }
    },
    *removeRoute({ payload }, { call, put }) {
      const res = yield call(removeRoute, payload);
      if (res.success) {
        message.success(res.data.message);
        yield put({ type: 'getRoutes' });
      }
    },
    *addRoutePoi({ payload }, { call, put, select }) {
      const res = yield call(addRoutePoi, payload);
      if (res.success) {
        yield put({
          type: 'set_route_poi',
          payload: res.data,
        });
        const { guide } = yield select(_ => _.guide);
        yield put({
          type: 'getRoutes',
          payload: {
            query: { guide_id: guide.id },
          },
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
        yield put({ type: 'getRoutes' });
      }
    },
    *removeRoutePoi({ payload }, { call, put }) {
      const res = yield call(removeRoutePoi, payload);
      if (res.success) {
        message.success(res.data.message);
        yield put({ type: 'getRoutes' });
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
  },
  reducers: {
    set_guide(state, action) {
      state.guide = action.payload;
    },
    set_routes(state, action) {
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
      state.guideTypes = action.payload;
    },
  },
};
