let axios = require('axios');
let config = require('../config.json');

class RequestManager {
    constructor() {
        this.requestResponse;
        this.error;
        this.projectId;
    }
    
    requestInstance(token) {
        return axios.create({
            baseURL: config.api_URL,
            timeout: 10000,
            headers: {
                'Authorization': token
            }
        });
    }

    get(endpoint, token) {
        return this.requestInstance(token).request({
            method: 'GET',
            url: endpoint,
            responseType: 'json'
        }).then(response => {
            return {'response' : response.data,
                    'status' : response.status
            };
        }).catch(error => {
            return {'response' : error.data,
                    'status' : error.status
            };
        });
    }

    post(endpoint, data, token) {
        return this.requestInstance(token).request({
            method: 'POST',
            url: endpoint,
            responseType: 'json',
            data : data
        }).then(response => {
            return {'response' : response.data,
                'status' : response.status
            };
        }).catch(error => {
            return {'response' : error.data,
                'status' : error.status
            };
        });
    }

    put(endpoint, body, token) {
        return this.requestInstance(token).request({
            method: 'PUT',
            url: endpoint,
            responseType: 'json',
            data: body
        }).then(response => this.setResponse(response))
            .catch(error => this.setError(error));
    }

    delete(endpoint, token) {
        return this.requestInstance(token).request({
            method: 'DELETE',
            url: endpoint,
            responseType: 'json'
        }).then(response => {
            return {
                'response' : response.data,
                'status' : response.status
            };
        }).catch(error => {
            return {
                'response' : error.data,
                'status' : error.status
            };
        });
    }

    setResponse(response) {
        this.requestResponse = response;
    }

    setError(error) {
        this.error = error.status;
    }

    getResponse() {
        return this.requestResponse;
    }
}

module.exports = new RequestManager();
