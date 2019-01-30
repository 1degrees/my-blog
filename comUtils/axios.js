import Axios from 'axios';
import qs from 'qs'
import { isPlainObject } from 'lodash/lang';
import { BLOG_API } from '../config'

const axios = Axios.create({
  baseURL: BLOG_API,
  timeout: 20000,
  withCredentials: true,
  responseType: 'json',
  transformRequest(data) {
    if (isPlainObject(data)) data = qs.stringify(data);
    return data;
  }
});

export { axios }
export default axios
