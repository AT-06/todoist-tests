// deleteProject.spec.js
let config = require('../../config.json');
let expect = require('chai').expect;
let loginPage = require('../../pages/LoginPage');
let leftSidebarPage = require('../../pages/LeftSidebarPage');
let contentPage = require('../../pages/ContentPage');
let requestManager = require('../../api/RequestManager');
let querystring = require('querystring');

describe('Acceptance Tests to Project feature, delete a project', function () {
    let data = {
        name: 'Project to test delete'
    };

    //Login application.
    beforeEach(function () {
        // Login on website with credentials.
        loginPage.login(config.acc1_email, config.acc1_password);
        //leftSidebarPage.addProject(project.name);
        return requestManager.post('/projects', querystring.stringify(data), config.api_Token1);
    });

    it('should allow to delete a project', function () {
        leftSidebarPage.deleteProject(requestManager.getResponse().data.name);
        // Verify if last project added "Project to delete" has been deleted.
        expect(leftSidebarPage.lastProjectOnList.getText()).to.not.have.equal(requestManager.getResponse().data.name);
    });
});
