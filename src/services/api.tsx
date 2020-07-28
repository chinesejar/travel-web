import config from '../config';

const { amapKey, serverUrl } = config;

export const searchAmapPois = (keywords) => ({
  url: `https://restapi.amap.com/v3/place/text?key=${amapKey}&keywords=${keywords}`,
  method: 'get'
})

export const getPois = () => ({
  url: `${serverUrl}/v1/poi`,
  method: 'get',
})

export const addPoi = (data) => ({
  url: `${serverUrl}/v1/poi`,
  method: 'post',
  data
})
