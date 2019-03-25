import { get } from 'axios';

export default {
    axiosConfig: {
        headers: { 'Authorization': '' },

        timeout: 5000,

        responseType: 'json',

        responseEncoding: 'utf8'
    },
    getStorage() {
        return window.localStorage.getItem("access_token");
    },
    getNowTime() {
        return Date.parse(new Date()) / 1000;
    },
    requestToken(callback) {
        get('/user/genToken', this.axiosConfig)
            .then((response)=>{
                let data = response.data;
                data.tokentime = this.getNowTime();
                window.localStorage.setItem("access_token", JSON.stringify(data));
                if (callback) {
                    callback();
                }
            })
            .catch((error)=>{
                this.formatErrorMsg(error);
            })
    },
    getToken(callback) {
        let storage = this.getStorage();
        if (!storage) {
            this.requestToken(callback);
        }
        else {
            try {
                let data = JSON.parse(storage);
                let delay = this.getNowTime() - data.tokentime;
                if (delay > data.expire) {
                    this.requestToken(callback);
                }
                else if (callback) {
                    callback();
                }
            }
            catch (e) {
                window.localStorage.removeItem("access_token");
                throw e;
            }
        }
    },
    queryRequest(url, callback, errorcallback) {
        let tokenValid = false;
        if (this.getStorage()) {
            let storage = JSON.parse(this.getStorage());
            let delay = this.getNowTime() - storage.tokentime;
            tokenValid = delay < storage.expire;
        }

        if (!tokenValid) {
            this.getToken(() => {
                this.queryData(url, callback, errorcallback)
            });
        }
        else {
            this.queryData(url, callback, errorcallback);
        }
    },
    queryData(url, callback, errorcallback, retry) {
        let storage = JSON.parse(this.getStorage());
        this.axiosConfig.headers.Authorization = "Bearer " + storage.token;
        get(url, this.axiosConfig).then((response)=>{
            if (callback) {
                callback(response.data);
            }
        }).catch((error) => {
            if (errorcallback && error.response 
                    && error.response.status == 401 && !retry) {
                this.getToken(() => {
                    this.queryData(url, callback, errorcallback, true);
                });
            }
            else if (errorcallback && error.response) {
                errorcallback(error.response);
            }
            if (error.response===undefined) {
                errorcallback({code: "TIMEOUT", message: error.message});
            }
        });
    },
    formatErrorMsg(error) {
        if (error.code=="ECONNABORTED" || error.code=="TIMEOUT") {
            return error.message;
        }
        else if (error.status == 401){
            window.localStorage.setItem('access_token','');
            return "ERROR: No Authorization, Please Refresh Page";
        }
        else if (error.status == 429) {
            return "ERROR: Too Many Requests";
        }
        else if (error.status == 500) {
            return "ERROR: Internal Server Error";
        }
    }

}