/*
 * @Author: xiao·Zhang 
 * @Date:   2018-08-09 11:03:25 
 * @Last    Modified by: xiao·Zhang
 * @Last    Modified time: 2018-11-29 10:35:49
 * @file:   拦截器（路由 & axios & ajax）
 */
 
import Router from 'next/router'
import messageEvent from './observer';
import { message } from "antd";
import { axios } from './axios';

Router.onRouteChangeStart = url => {
    messageEvent.fire('LOADING', true);
}

Router.onRouteChangeComplete = url => {
    messageEvent.fire('LOADING', false);
}

Router.onRouteChangeError = url => {
    messageEvent.fire('LOADING', false);
}

// 添加拦截(请求发送)
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    messageEvent.fire('LOADING', true);
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// 添加拦截(结果返回)
axios.interceptors.response.use(function (response) {
    // Do something with response data
    messageEvent.fire('LOADING', false);
    return response;
}, function (error) {
    // Do something with response error
    messageEvent.fire('LOADING', false);
    return Promise.reject(error);
});