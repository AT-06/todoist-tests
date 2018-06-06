// modifyProject.spec.js
let config = require('../../config.json');
let expect = require('chai').expect;
let loginPage = require('../../pages/LoginPage');
let leftSidebarPage = require('../../pages/LeftSidebarPage');
let requestManager = require('../../api/RequestManager');
let querystring = require('querystring');

describe('Acceptance Tests to Project feature, modify a project', function () {
    let project = {
        nameModified : 'Project MODIFIED'
    };

    let data = {
        name: 'Project to test'
    };

    let response;

    //Login and add a new project.
    beforeEach(function () {
        response = browser.call(() => {return requestManager.post('/projects', querystring.stringify(data), config.api_Token1)});
        loginPage.login(config.acc1_email, config.acc1_password);
    });

    //Delete project, post condition.
    afterEach(function () {
        let deleteProject = browser.call(() => {return requestManager.delete('/projects/' + response.response.id, config.api_Token1)});
    });

    it('should allow to Modify a project', function () {
        leftSidebarPage.modifyProject(data.name, project.nameModified);
        // Verify if last project added "Project to Added" has been changed to "Project MODIFIED".
        expect(leftSidebarPage.lastProjectOnList.getText()).to.have.equal(project.nameModified)
    });
});