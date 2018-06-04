let expect = require('chai').expect;
let requestManager = require('../../api/RequestManager');

describe('Acceptance Tests for API, get all projects', function () {
    it('should allow to get all project', function () {
        return requestManager.get('/projects');
    });
});

describe('Acceptance Tests for API, post a new project', function () {
    it('should allow to create a new project', function* () {
        let data = {
            name: 'Project created API'
        };
        return requestManager.post('/projects', data);
    });
});

describe('Acceptance Tests for API, put an existing project', function () {
    it('should allow to edit an existing project', function () {
        let data = {
            name: 'Project edited'
        };
        return requestManager.put('/projects', data);
    });
});

describe('Acceptance Tests for API, delete a project', function () {
    it('should allow to edit an existing project', function () {
        return requestManager.delete('/projects');
    });
});
