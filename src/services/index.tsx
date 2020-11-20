import request from '@/utils/request';
import store from 'store';

import api from './api';

const gen = params => {
  let url = params;
  let method = 'GET';

  const paramsArray = params.split(' ');
  if (paramsArray.length === 2) {
    method = paramsArray[0];
    url = paramsArray[1];
  }

  return function({ data, param, query } = {}) {
    const token = store.get('token');
    return request({
      url,
      data,
      param,
      query,
      method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
};

const APIFunction = {};
for (const key in api) {
  APIFunction[key] = gen(api[key]);
}

export default APIFunction;
