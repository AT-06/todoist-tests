let axios = require('axios');
let config = require('../config.json');

class RequestManager {
    constructor() {
        this.status;
        this.error;
    }
    
    intanceRequests() {
        return axios.create({
            baseURL: config.api_URL,
            timeout: 10000,
            headers: {
                'Authorization': config.api_Token
            }
        });
    }

    get(endpoint) {
        return this.intanceRequests().request({
            method: 'GET',
            url: endpoint,
            responseType: 'json'
        }).then(response => this.setResponse(response))
            .catch(error => this.setError(error));
    }

    post(endpoint, data) {
        return this.intanceRequests().request({
            method: 'POST',
            url: endpoint,
            responseType: 'application/json',
            data: {
                name: 'Project created API'
            }
        }).then(response => this.setResponse(response))
            .catch(error => this.setError(error));
    }

    put(endpoint, body) {
        return this.intanceRequests().request({
            method: 'PUT',
            url: endpoint,
            responseType: 'json',
            data: body
        }).then(response => this.setResponse(response))
            .catch(error => this.setError(error));
    }

    delete(endpoint) {
        return this.intanceRequests().request({
            method: 'DELETE',
            url: endpoint,
            responseType: 'json'
        }).then(response => this.setResponse(response))
            .catch(error => this.setError(error));
    }

    setResponse(response) {
        console.log("status:" + response.status);
        this.status = response.status;
    }

    setError(error) {
        this.error = error.status;
    }

    getResponse() {
        return this.status;
    }
}

module.exports = new RequestManager();
