let config = require('../../config.json');
let expect = require('chai').expect;
let requestManager = require('../../api/RequestManager');
let axios = require('axios');

describe('Acceptance Tests for API, post a new project', function () {
    it('should allow to delete a project', function () {
        //requestManager.getResponse();
        let status;
        let instance =  axios.create({
            baseURL: 'https://beta.todoist.com/API/v8',
            headers: {
                'Authorization': 'Bearer ea8c82aa2deaed6de59d372d0e25ac05e09697c2'
            }
        });
        status = instance
            .get('/projects')
            .then(response => {
                return response.status;
            })
            .catch(error => {
                return error.message;
            });
        console.log("status:" + status);
    });

});
