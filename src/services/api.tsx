import config from '../config';

const { amapKey, serverUrl } = config;

export default {
  getGuideTypes: '/v1/type/guide',
  getPoiTypes: '/v1/type/poi',
  getPois: '/v1/poi',
  addPoi: 'POST /v1/poi',
};

export const searchAmapPois = keywords => ({
  url: `https://restapi.amap.com/v3/place/text?key=${amapKey}&keywords=${keywords}`,
  method: 'get',
});

export const getGuideTypes = () => ({
  url: `${serverUrl}/v1/type/guide`,
  method: 'get',
});

export const getPois = () => ({
  url: `${serverUrl}/v1/poi`,
  method: 'get',
});

export const addPoi = data => ({
  url: `${serverUrl}/v1/poi`,
  method: 'post',
  data,
});

export const getPoiTypes = () => ({
  url: `${serverUrl}/v1/type/poi`,
  method: 'get',
});
