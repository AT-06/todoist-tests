let config = require('../../config.json');
let expect = require('chai').expect;
let requestManager = require('../../api/RequestManager');
let axios = require('axios');

describe('Acceptance Tests for API, post a new project', function () {
    it('should allow to delete a project', function () {
        requestManager.getResponse();
        /*let instance =  axios.create({
            baseURL: 'https://beta.todoist.com/API/v8',
            headers: {
                'Authorization': 'Bearer ea8c82aa2deaed6de59d372d0e25ac05e09697c2'
            }
        });
        instance
            .get('/projects')
            .then(function(response) {
                console.log(response);
            })
            .catch(function(error) {
                console.log(error);
            });*/
    });

});
