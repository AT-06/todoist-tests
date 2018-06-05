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

    get(endpoint, projectName, token) {
        return this.requestInstance(token).request({
            method: 'GET',
            url: endpoint,
            responseType: 'json'
        //}).then(response => this.deleteProject(response.data, projectName, endpoint, token))
        }).then(response => this.setResponse(response))
            .catch(error => this.setError(error));
    }

    post(endpoint, data, token) {
        return this.requestInstance(token).request({
            method: 'POST',
            url: endpoint,
            responseType: 'json',
            data : data
        }).then(response => this.setResponse(response))
            .catch(error => this.setError(error));
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
        }).then(response => this.setResponse(response))
            .catch(error => this.setError(error));
    }

    setResponse(response) {
        console.log("response:" + response.status);
        this.requestResponse = response;
    }

    setError(error) {
        console.log("error:" + error.message);
        this.error = error.status;
    }

    getResponse() {
        return this.requestResponse;
    }



    deleteProject(response, projectName, endpoint, token) {
        if (endpoint.includes('project')) {
            return this.delete(endpoint + '/' + this.getProjectId(response, projectName), token);
        } else {
            return this.delete(endpoint + '/' + this.getTaskId(response, projectName), token);
        }
    }
    getProjectId(response, projectName) {
        let id;
        Object.entries(response).forEach(
            ([key, value]) => {
                if (value.name == projectName) {
                    id = value.id;
                }
            }
        );
        return id;
    }
    getTaskId(response, taskName) {
        let id;
        Object.entries(response).forEach(
            ([key, value]) => {
                if (value.content == taskName) {
                    id = value.id;
                }
            }
        );
        return id;
    }
}

module.exports = new RequestManager();
