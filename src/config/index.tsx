export default {
  amapKey: 'e251a73df57f20104f1c2a20059365d7',
  mapView: {
    center: [116.397428, 39.90923],
    zoom: 11,
  },
  serverUrl:
    process.env.NODE_ENV === 'development'
      ? 'http://127.0.0.1:3000'
      : 'http://travel-api.timeroute.cn',
};
