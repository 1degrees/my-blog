/*
 * @Author: xiao·Zhang 
 * @Date: 2018-08-09 11:03:25 
 * @Last Modified by: xiao·Zhang
 * @Last Modified time: 2018-11-29 10:04:31
 * @file: 判断第三方库是否已在页面加载流程函数
 */
 
/**
 * @export LoaderLib
 * @param {*} lib 页面标签引入的第三方库
 * @returns { Promise } promise 判断资源是否加载完成的流程函数
 */
export default function LoaderLib(...lib) {
    let timer, allLoad = true;
    return new Promise((resolve, reject) => {
        let allLoad = true, count = 0,
            timer = setInterval(() =>{
                count ++; console.log('资源加载耗时：', count * 200, 'MS')
                lib && lib.length && lib.forEach(e => { allLoad = (allLoad && !!e) });
                if(allLoad) {
                    clearInterval(timer);
                    resolve('资源加载成功');
                }
                if(count == 50 && !allLoad) {
                    clearInterval(timer);
                    reject('资源加载超时');
                }
            }, 200)
    })
}