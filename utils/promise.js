/*
 * @Author: xiao·Zhang 
 * @Date: 2018-08-09 11:03:25 
 * @Last Modified by: xiao·Zhang
 * @Last Modified time: 2019-01-18 14:19:35
 * @file: 自定义 promise.progress 替代 Promise.all 异常缺陷
 */
const promise = {
    progress : async (promises) => {
        return new Promise((resolve, reject) => {
            let count = 0,
                rss = [],
                len = promises.length,
                errInfo = [];
            for(let i in promises){
                promises[i].then(res => {
                    rss[i] = res;
                    try {
                        if(res.data.status != 1){
                            errInfo.push(`${res.config.url.replace(/^.*\.com/,'')}请求数据失败！！！`)
                        }
                    } catch (error) {
                        console.warn(error)
                    }
                },rej => {
                    rss[i] = {
                            data: {
                            status : 0,
                            msg : rej
                        }
                    };
                    try {
                        errInfo.push(`${rej.config.url.replace(/^.*\.com/,'')}请求数据失败！！！`)
                    } catch (error) {
                        console.warn(error)
                    }
                }).catch(err => {
                    rss[i] = {
                            data: {
                            status : 0,
                            msg : err
                        }
                    };
                    errInfo.push(`接口服务器错误！！！`)
                }).finally(()=>{
                    ++count;
                    if(count === len) {
                        resolve(rss); 
                    }
                })
            }
        })
    }
};

export default promise;