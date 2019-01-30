/*
 * @Author: xiao·Zhang 
 * @Date: 2018-08-09 11:03:25 
 * @Last Modified by: zhangbh
 * @Last Modified time: 2019-01-22 16:38:46
 * @file: 请求数据驼峰转换工具
 */

import { isArray, isPlainObject, camelCase, snakeCase } from 'lodash';

const IGNORED = ['_destroy'];

export function objectRecursiveTransform(obj, func) {
  if (isArray(obj)) {
    return obj.map(e => objectRecursiveTransform(e, func));
  }

  if (!isPlainObject(obj)) {
    return obj;
  }

  const result = {};

  for (const key in obj) {
    const val = obj[key];
    const tKey = IGNORED.includes(key) ? key : func(key);

    if (isArray(val) || isPlainObject(val)) {
      result[tKey] = objectRecursiveTransform(val, func);
    } else {
      result[tKey] = val;
    }
  }

  return result;
}
export function camelizeKeys(obj) {
  return objectRecursiveTransform(obj, camelCase);
}

export function snakeizeKeys(obj) {
  return objectRecursiveTransform(obj, snakeCase);
}

export const addImgURL = (url, w, h) =>  {
  let imgURL = '';
  if (!url) return imgURL;

  if (url && url.includes('osscdn')) {
    imgURL = `${url}?x-oss-process=image/crop,w_${w},h_${h},g_center`
    // imgURL = `${url}?x-oss-process=image/resize,m_fill,h_${h},w_${w}`
  }

  if (url && url.includes('qncdn')) {
    imgURL = `${url}?imageView1/1/w/${w}/h/${h}`
  }

  return imgURL;
}

export const calcNumber = (num) => {
  let txt = num;
  if (Number(num) == 10000) {
    txt = '1W'
  } else if (Number(num) > 10000) {
    txt = '1W+'
  }

  return txt;
}