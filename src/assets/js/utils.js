import { get } from 'axios';

export default {
    axiosConfig: {
        transformRequest: [function (data, headers) {
            return data;
        }],

        transformResponse: [function (data) {
            return data;
        }],

        headers: { 'Authorization': '' },

        timeout: 5000,

        responseType: 'json',

        responseEncoding: 'utf8'
    },
    getStorage : function() {
        return window.localStorage.getItem("access_token");
    },
    httpGet: function(url) {
        let token = this.getStorage();

        get(url, this.axiosConfig).then(function (response) {
            console.log(response.data);
            console.log(response.status);
            console.log(response.statusText);
            console.log(response.headers);
            console.log(response.config);
        });
    },
    getNowTime: function() {
        return Date.parse(new Date()) / 1000;
    },
    requestToken : function(callback) {
        get('/user/genToken', this.axiosConfig).then((response)=>{
            let data = response.data;
            data.tokentime = this.getNowTime();
            window.localStorage.setItem("access_token", JSON.stringify(data));
            if (callback) {
                callback();
            }
        })
    },
    getToken: function(callback) {
        let storage = this.getStorage("access_token");
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
                this.requestToken(callback);
            }
        }
    },
    queryRequest: function(url, callback, errorcallback) {
        let storage = JSON.parse(this.getStorage());
        let delay = this.getNowTime() - storage.tokentime;
        if (delay > storage.expire) {
            this.requestToken(function () {
                this.queryData(url, callback, errorcallback)
            });
        }
        else {
            this.queryData(url, callback, errorcallback);
        }
    },
    queryData: function(url, callback, errorcallback) {
        let storage = JSON.parse(this.getStorage());
        this.axiosConfig.headers.Authorization = "Bearer " + storage.token;
        get(url, this.axiosConfig).then((response)=>{
            if (callback) {
                callback(response.data);
            }
        }).catch(function (error) {
            debugger;
            if (errorcallback) {
                errorcallback(error.response);
            }
        });
    },
    formatErrorMsg(error) {
        if (error.statusText=='timeout') {
            return "ERROR: Client Request Timeout";
        }
        else if (error.status == 401){
            return "ERROR: No Authorization, Please Refresh Page";
            localStorage.setItem('access_token','');
        }
        else if (error.status == 429) {
            return "ERROR: Too Many Requests";
        }
        else if (error.status == 500) {
            return "ERROR: Internal Server Error";
        }
    }

}