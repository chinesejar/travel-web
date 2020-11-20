import axios from 'axios';
import { message, notification } from 'antd';
import store from 'store';
import config from '../config';

const { serverUrl } = config;
const { CancelToken } = axios;
window.cancelRequest = new Map();

export default function request(options) {
  let { param, query, url } = options;

  try {
    if (param) {
      for (const p in param) {
        url = url.replace(`\:${p}`, param[p]);
      }
    }

    if (url.indexOf('http') === -1) url = serverUrl + url;
  } catch (e) {
    message.error(e.message);
  }

  options.url = url;
  options.params = query;
  options.cancelToken = new CancelToken(cancel => {
    window.cancelRequest.set(Symbol(Date.now()), {
      pathname: window.location.pathname,
      cancel,
    });
  });

  return axios(options)
    .then(response => {
      const { statusText, status, data } = response;

      let result = { data };

      return Promise.resolve({
        success: true,
        message: statusText,
        statusCode: status,
        ...result,
      });
    })
    .catch(error => {
      const { response, message } = error;

      if (String(message) === 'cancel request') {
        return {
          success: false,
        };
      }

      let msg;
      let statusCode;

      if (response.status === 401) {
        store.set('token', null);
        store.set('user', null);
        location.href = '/login';
      }

      if (response && response instanceof Object) {
        const { data, statusText } = response;
        statusCode = response.status;
        msg = data.message || statusText;
      } else {
        statusCode = 600;
        msg = error.message || 'Network Error';
      }

      notification.error({
        message: '请求异常',
        description: msg,
      });

      /* eslint-disable */
      return Promise.resolve({
        success: false,
        statusCode,
        message: msg,
      });
    });
}
