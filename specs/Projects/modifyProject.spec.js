// modifyProject.spec.js
let config = require('../../config.json');
let expect = require('chai').expect;
let loginPage = require('../../pages/LoginPage');
let leftSidebarPage = require('../../pages/LeftSidebarPage');
let projectToAdd = 'Test Project';
let projectToModify = 'Project MODIFIED';

describe('Acceptance Tests to Project feature modify', function () {
    beforeEach(function () {
        // Login on website with credentials.
        loginPage.login(config.acc1_email, config.acc1_password);
        leftSidebarPage.addProject(projectToAdd);
    });

    afterEach(function () {
        leftSidebarPage.deleteProject(projectToModify);
    });

    it('should allow to Modify a project', function () {
        //leftSidebarPage.addProject(projectToAdd);
        leftSidebarPage.modifyProject(projectToAdd, projectToModify);
        // Verify if last project added "Project to Added" has been changed to "Project MODIFIED".
        expect(leftSidebarPage.lastProjectOnList.getText()).to.have.equal(projectToModify)
    });
});