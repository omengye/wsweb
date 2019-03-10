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
        debugger;
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
    queryRequest: function(url, json, callback, errorcallback) {
        let storage = JSON.parse(this.getStorage());
        let delay = this.getNowTime() - storage.tokentime;
        if (delay > storage.expire) {
            this.requestToken(function () {
                this.queryData(url, json, callback, errorcallback)
            });
        }
        else {
            this.queryData(url, json, callback, errorcallback);
        }
    },
    queryData: function(url, json, callback, errorcallback) {
        let storage = JSON.parse(this.getStorage());
        this.axiosConfig.headers.Authorization = "Bearer " + storage.token;
        get(url, this.axiosConfig).then((response)=>{
            if (callback) {
                callback(response.data);
            }
        }).catch(function (error) {
            debugger;
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        });



        //     error: function (xhr, statusText, err) {
        //         if (statusText == 'timeout') {
        //             showInfoError("ERROR: Client Request Timeout");
        //         }
        //         else if (xhr.status == 401) {
        //             showInfoError("ERROR: No Authorization, Please Refresh Page");
        //             localStorage.setItem('access_token', '');
        //         }
        //         else if (xhr.status == 429) {
        //             showInfoError("ERROR: Too Many Requests");
        //         }
        //         else if (xhr.status == 500) {
        //             showInfoError("ERROR: Internal Server Error");
        //         }
        //         if (errorcallback) {
        //             errorcallback(xhr.status);
        //         }
        //     }
        // });
    }

}