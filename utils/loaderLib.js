/*
 * @Author: xiao·Zhang 
 * @Date: 2018-08-09 11:03:25 
 * @Last Modified by: xiao·Zhang
 * @Last Modified time: 2019-02-28 16:49:10
 * @file: 判断第三方库是否已在页面加载流程函数
 */
 
/**
 * @export LoaderLib
 * @param {*} libs 页面标签引入的第三方库
 * @returns { Promise } promise 判断资源是否加载完成的流程函数
 */
export default function LoaderLib(libs) {
    return new Promise((resolve, reject) => {
        let allLoad = true, count = 0,
            timer = setInterval(() =>{
                count ++; console.log('资源加载耗时：', count * 500, 'MS')
                libs && libs.length && libs.forEach(e => { allLoad = (allLoad && !!e.context[e.ref]) });
                if(allLoad) {
                    clearInterval(timer);
                    resolve('资源加载成功');
                }
                if(count == 50 && !allLoad) {
                    clearInterval(timer);
                    reject('资源加载超时');
                }
            }, 300)
    })
}