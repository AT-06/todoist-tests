let expect = require('chai').expect;
let requestManager = require('../../api/RequestManager');
let querystring = require('querystring');
let loginPage = require('../../pages/LoginPage');
let config = require('../../config.json');
let leftSidebarPage = require('../../pages/LeftSidebarPage');

describe('Acceptance Tests for API, post a new project', function () {
    let data = {
        name: 'Project to test'
    };

    it('should allow to delete a project', function () {
        console.log("xxxx");
        //leftSidebarPage.deleteProject(requestManager.getResponse().data.name);
        // Verify if last project added "Project to delete" has been deleted.
        //expect(leftSidebarPage.lastProjectOnList.getText()).to.not.have.equal(requestManager.getResponse().data.name);
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
        expect(requestManager.delete('/projects'));

    });
});
