import Vue from 'vue'
import axios from 'axios';
import {PROXY_PREFIX} from 'manage/config.js'
import {PROXY_PREFIX_CENTER} from 'manage/config.js'

const POST_CONFIG = {
    method: 'POST',
    transformRequest: [function (data) {
        // Do whatever you want to transform the data
        let ret = ''
        for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
    }],
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    timeout: 90 * 1000
};

export default class Http {
    constructor() {

    }

    $get(url, paramObj) {
        const _url = `${PROXY_PREFIX}${url}`;
        return new Promise((resolve, reject) => {
            axios.get(_url, {
                params: paramObj
            }).then(response => {
                if (response.data.code === 10000) {
                    resolve(response.data.data);
                } else {
                    reject(response.data.code);
                }
            }).catch(err => {
                reject(err.response.status + ', ' + err.response.statusText);
            });
        })
    }

    $post(url, paramObj) {
        const _url = `${PROXY_PREFIX}${url}`;
        return new Promise((resolve, reject) => {
            axios(Object.assign({}, POST_CONFIG, {
                url: _url,
                data: paramObj
            })).then((response) => {
                if (response.data.code === 10000) {
                    resolve(response.data.data);
                } else {
                    reject(response.data.code);
                }
            }).catch(err => {
                if (err.response) {
                    reject(err.response.status + ', ' + err.response.statusText);
                    return;
                }

                let str = err.toString();
                reject(str.includes('timeout') ? '网络超时，请稍后重试' : str);
            })
        });
    }

    $getMsg(url, paramObj) {
        const _url = `${PROXY_PREFIX}${url}`;
        return new Promise((resolve, reject) => {
            axios.get(_url, {
                params: paramObj
            }).then(response => {
                if (response.data.code === 10000) {
                    resolve(response.data.data);
                } else {
                    reject(response.data.msg);
                }
            }).catch(err => {
                reject(err.response.status + ', ' + err.response.statusText);
            });
        })
    }

    /** 返回msg，而不是code **/
    $postMsg(url, paramObj) {
        const _url = `${PROXY_PREFIX}${url}`;
        return new Promise((resolve, reject) => {
            axios(Object.assign({}, POST_CONFIG, {
                url: _url,
                data: paramObj
            })).then((response) => {
                if (response.data.code === 10000) {
                    resolve(response.data.data);
                } else {
                    reject(response.data.msg);
                }
            }).catch(err => {
                if (err.response) {
                    reject(err.response.status + ', ' + err.response.statusText);
                    return;
                }

                let str = err.toString();
                reject(str.includes('timeout') ? '网络超时，请稍后重试' : str);
            })
        });
    }

    $getCenter(url, paramObj) {
        const _url = `${PROXY_PREFIX_CENTER}${url}`;
        return new Promise((resolve, reject) => {
            axios.get(_url, {
                params: paramObj
            }).then(response => {
                if (response.data.code === 0) {
                    resolve(response.data);
                } else {
                    reject(response.data.code + ', ' + response.data.msg || response.data.debug_msg);
                }
            }).catch(err => {
                reject(err.response.status + ', ' + err.response.statusText);
            });
        })
    }
}
