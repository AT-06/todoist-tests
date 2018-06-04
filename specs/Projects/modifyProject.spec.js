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
    //Login and add a new project.
    beforeEach(function () {
        loginPage.login(config.acc1_email, config.acc1_password);
        //leftSidebarPage.addProject(project.name);
        return requestManager.post('/projects', querystring.stringify(data));
    });

    //Delete project, post condition.
    afterEach(function () {
        //leftSidebarPage.deleteProject(project.nameModified);
        return requestManager.delete('/projects/' + requestManager.getResponse().data.id);
    });

    it('should allow to Modify a project', function () {
        console.log("xxxxxxxxxxxx:" + requestManager.getResponse().data.name);
        leftSidebarPage.modifyProject(requestManager.getResponse().data.name, project.nameModified);
        // Verify if last project added "Project to Added" has been changed to "Project MODIFIED".
        expect(leftSidebarPage.lastProjectOnList.getText()).to.have.equal(project.nameModified)
    });
});