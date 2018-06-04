// modifyProject.spec.js
let config = require('../../config.json');
let expect = require('chai').expect;
let loginPage = require('../../pages/LoginPage');
let leftSidebarPage = require('../../pages/LeftSidebarPage');

describe('Acceptance Tests to Project feature, modify a project', function () {
    let project = {
        name : 'Test Project',
        nameModified : 'Project MODIFIED'
    };
    //Login and add a new project.
    beforeEach(function () {
        loginPage.login(config.acc1_email, config.acc1_password);
        leftSidebarPage.addProject(project.name);
    });

    //Delete project, post condition.
    afterEach(function () {
        leftSidebarPage.deleteProject(project.nameModified);
    });

    it('should allow to Modify a project', function () {
        leftSidebarPage.modifyProject(project.name, project.nameModified);
        // Verify if last project added "Project to Added" has been changed to "Project MODIFIED".
        expect(leftSidebarPage.lastProjectOnList.getText()).to.have.equal(project.nameModified)
    });
});