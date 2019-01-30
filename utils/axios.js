import qs from 'qs';
import Axios from 'axios';
import { BLOG_API } from '@config';
import { isPlainObject } from 'lodash/lang';
// import { camelizeKeys, snakeizeKeys } from './transforms';
console.log(BLOG_API)
const axios = Axios.create({
  baseURL: BLOG_API,
  timeout: 5000, //接口超时时长5秒
  withCredentials: true,
  responseType: 'json',
  transformRequest(data) {
    if (isPlainObject(data)) data = qs.stringify(data);
    return data;
  }
});

export { axios }
export default axios
