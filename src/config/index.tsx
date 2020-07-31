export default {
  amapKey: 'e251a73df57f20104f1c2a20059365d7',
  mapboxView: {
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [107, 35],
    zoom: 3.4,
  },
  mapboxToken:
    'pk.eyJ1IjoiYXN0cm9zYXQiLCJhIjoiY2o3YWtjNnJzMGR6ajM3b2FidmNwaDNsaSJ9.lwWi7kOiejlT0RbD7RxtmA',
  serverUrl: process.env.NODE_ENV === 'development' ? 'http://192.168.124.56:3000' : 'http://travel-api.timeroute.cn',
}
