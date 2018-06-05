let axios = require('axios');
let config = require('../config.json');

class RequestManager {
    constructor() {
        this.requestResponse;
        this.error;
    }
    
    requestInstance() {
        return axios.create({
            baseURL: config.api_URL,
            timeout: 10000,
            headers: {
                'Authorization': config.api_Token
            }
        });
    }

    get(endpoint) {
        return this.requestInstance().request({
            method: 'GET',
            url: endpoint,
            responseType: 'json'
        }).then(response => this.setResponse(response))
            .catch(error => this.setError(error));
    }

    post(endpoint, data) {
        return this.requestInstance().request({
            method: 'POST',
            url: endpoint,
            responseType: 'json',
            data : data
        }).then(response => this.setResponse(response))
            .catch(error => this.setError(error));
    }

    put(endpoint, body) {
        return this.requestInstance().request({
            method: 'PUT',
            url: endpoint,
            responseType: 'json',
            data: body
        }).then(response => this.setResponse(response))
            .catch(error => this.setError(error));
    }

    delete(endpoint) {
        return this.requestInstance().request({
            method: 'DELETE',
            url: endpoint,
            responseType: 'json'
        }).then(response => this.setResponse(response))
            .catch(error => this.setError(error));
    }

    setResponse(response) {
        this.requestResponse = response;
    }

    setError(error) {
        console.log("error:" + error.message);
        this.error = error.status;
    }

    getResponse() {
        return this.requestResponse;
    }

}

module.exports = new RequestManager();
