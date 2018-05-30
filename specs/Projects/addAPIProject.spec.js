let config = require('../../config.json');
let expect = require('chai').expect;
let requestManager = require('../../api/RequestManager');

describe('Acceptance Tests for API, post a new project', function () {
    it('should allow to delete a project', function () {
        //requestManager.getResponse();
        const axios = require('axios');
        let instance = axios.create({
            baseURL: 'https://beta.todoist.com/API/v8',
            //timeout: 1000,
            headers: {'X-Custom-Header': 'ea8c82aa2deaed6de59d372d0e25ac05e09697c2'}
        });
        instance.get('/projects')
            .then(function (response) {
                console.log("response:" + response);
            })
            .catch(function (error) {
                console.log("error:" + error);
            });
        /*axios.get('http://www.example.com/user').then(function (response) {
            console.log("response:" + response);
        });*/
    });
});