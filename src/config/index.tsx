const isDevelopment = process.env.NODE_ENV === 'development';

export default {
  amapKey: 'e251a73df57f20104f1c2a20059365d7',
  mapView: {
    center: [116.397428, 39.90923],
    zoom: 11,
  },
  serverUrl: isDevelopment
    ? 'http://127.0.0.1:3000'
    : 'http://travel-api.timeroute.cn',
  mediaUrl: isDevelopment
    ? 'http://127.0.0.1:9000'
    : 'http://travel-storage.timeroute.cn',
};
