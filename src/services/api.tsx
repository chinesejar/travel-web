export default {
  // auth
  login: 'POST /auth/login',
  register: 'POST /auth/register',
  // user
  getUser: '/v1/user',
  // types
  getGuideTypes: '/v1/type/guide',
  getPoiTypes: '/v1/type/poi',
  // guide
  getGuides: '/v1/guide',
  getGuide: '/v1/guide/:id',
  addGuide: 'POST /v1/guide',
  putGuide: 'PUT /v1/guide/:id',
  removeGuide: 'DELETE /v1/guide/:id',
  // route
  getRoutes: '/v1/route',
  addRoute: 'POST /v1/route',
  putRoute: 'PUT /v1/route/:id',
  removeRoute: 'DELETE /v1/route/:id',
  // route-poi
  addRoutePoi: 'POST /v1/route-poi',
  putRoutePoi: 'PUT /v1/route-poi/:id',
  removeRoutePoi: 'DELETE /v1/route-poi/:id',
  // poi-image
  removePoiImage: 'DELETE /v1/poi-image',
  // route-image
  removeRouteImage: 'DELETE /v1/route-image',
  // poi
  getPois: '/v1/poi',
  addPoi: 'POST /v1/poi',
};
