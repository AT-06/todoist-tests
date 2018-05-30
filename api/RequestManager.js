let axiosRequest = require('axios');

class RequestManager {
    intanceRequests() {
        return axiosRequest.create({
            baseURL: 'https://beta.todoist.com/API/v8',
            //timeout: 1000,
            headers: {'X-Custom-Header': 'ea8c82aa2deaed6de59d372d0e25ac05e09697c2'}
        });
    }

    getResponse() {
        this.intanceRequests().get('/projects')
            .then(function (response) {
                console.log("response:" + response);
            })
            .catch(function (error) {
                console.log("error:" + error);
            });
    }
}

module.exports = new RequestManager();
