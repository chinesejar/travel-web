import { message } from 'antd';

export default {
  namespace: 'make',
  state: {
    guide: {
      title: '',
      content: '',
      routes: [],
    },
    index: -1,
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
    *setRoute({ payload }, { put }) {
      yield put({
        type: 'set_route',
        payload,
      });
    },
    *setIndex({ payload }, { put }) {
      yield put({
        type: 'set_index',
        payload,
      });
    },
    *addPoi({ payload }, { put }) {
      yield put({
        type: 'add_poi',
        payload,
      });
    },
    *removePoi({ payload }, { put }) {
      yield put({
        type: 'remove_poi',
        payload,
      });
    },
  },
  reducers: {
    set_guide(state, action) {
      state.guide = Object.assign(state.guide, action.payload);
    },
    add_route(state, action) {
      state.guide.routes.push(action.payload);
    },
    set_route(state, action) {
      state.guide.routes[state.index] = Object.assign(
        state.guide.routes[state.index],
        action.payload,
      );
    },
    set_index(state, action) {
      state.index = action.payload;
    },
    add_poi(state, action) {
      if (
        state.guide.routes[state.index].pois.find(
          ({ poi: { id } }) => id === action.payload.id,
        )
      ) {
        message.warn('该 POI 已添加！');
      } else {
        state.guide.routes[state.index].pois.push({
          poi: action.payload,
          content: '',
          images: [],
        });
      }
    },
    remove_poi(state, action) {
      state.guide.routes[state.index].pois.splice(action.payload, 1);
    },
  },
};
