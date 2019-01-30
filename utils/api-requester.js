<<<<<<< HEAD:comUtils/api-requester.js
/*
 * @Author: xiao·Zhang 
 * @Date: 2018-08-09 11:03:25 
 * @Last Modified by: xiao·Zhang
 * @Last Modified time: 2019-01-23 14:02:04
 * @file: ajax 二次封装
 */

import { axios_info } from './axios';
=======
>>>>>>> dev:utils/api-requester.js
import qs from 'qs';
import axios from './axios';

/**
 * Send GET request to project API
 * @param  {String} url       Relative path
 * @param  {Object} data      JSON data converts to URI: ?key=value&foo=bar
 * @param  {Object} options   Config for requester
 * @return {Promise}          Thenable/Catcheable
 */
function _get(ax) {
  return function(url, data = {}, options = {}) {
    return ax.get(url, { params: data, ...options });
  };
}

/**
 * Send POST request to inside of project
 * @param  {String} url       Relative path
 * @param  {Object} data      JSON data
 * @param  {Object} options   Config for requester
 * @return {Promise}          Thenable/Catcheable
 */
function _post(ax) {
  return function (url, data = {}, options = {}) {
    return ax.post(url, data, options);
  };
}

/**
 * Send PUT request to inside of project
 * @param  {String} url       Relative path
 * @param  {Object} data      JSON data
 * @param  {Object} options   Config for requester
 * @return {Promise}          Thenable/Catcheable
 */
export function _put(ax) {
  return function (url, data = {}, options = {}) {
    return ax.put(url, data, options);
  };
}

/**
 * Send PATCH request to inside of project
 * @param  {String} url       Relative path
 * @param  {Object} data      JSON data
 * @param  {Object} options   Config for requester
 * @return {Promise}          Thenable/Catcheable
 */
export function _patch(ax) {
  return function (url, data = {}, options = {}) {
    return ax.patch(url, data, options);
  };
}

/**
 * Send DELETE request to inside of project
 * @param  {String} url       Relative path
 * @param  {Object} data      JSON data
 * @param  {Object} options   Config for requester
 * @return {Promise}          Thenable/Catcheable
 */
export function _destroy(ax) {
  return function (url, data = null) {
    if (data) {
      url += url.includes('?') ? '&' : '?';
      url += qs.stringify(data, { arrayFormat: 'brackets' });
    }
    return ax.delete(url);
  };
}

export const get = _get(axios_info);
export const post = _post(axios_info);
export const put = _put(axios_info);
export const patch = _patch(axios_info);
export const destroy = _destroy(axios_info);