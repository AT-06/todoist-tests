// modifyProject.spec.js
let config = require('../../config.json');
let expect = require('chai').expect;
let loginPage = require('../../pages/LoginPage');
let leftSidebarPage = require('../../pages/LeftSidebarPage');
let projectToAdd = 'Test Project';
let projectToModify = 'Project MODIFIED';

describe('Acceptance Tests to Project feature, modify a project', function () {
    //Login and add a new project.
    beforeEach(function () {
        loginPage.login(config.acc1_email, config.acc1_password);
        leftSidebarPage.addProject(projectToAdd);
    });

    //Delete project, post condition.
    afterEach(function () {
        leftSidebarPage.deleteProject(projectToModify);
    });

    it('should allow to Modify a project', function () {
        leftSidebarPage.modifyProject(projectToAdd, projectToModify);
        // Verify if last project added "Project to Added" has been changed to "Project MODIFIED".
        expect(leftSidebarPage.lastProjectOnList.getText()).to.have.equal(projectToModify)
    });
});