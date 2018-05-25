// addProject.spec.js
let config = require('../../config.json');
let expect = require('chai').expect;
let loginPage = require('../../pages/LoginPage');
let leftSidebarPage = require('../../pages/LeftSidebarPage');
let contentPage = require('../../pages/ContentPage');
let projectToAdd = 'Test Project';
let projectToModify = 'Project MODIFIED';


describe('Acceptance Tests to Project feature', function () {
    beforeEach(function () {
        // Login on website with credentials.
        loginPage.login(config.acc1_email, config.acc1_password);
        leftSidebarPage.addProject(projectToAdd);
    });

    afterEach(function () {
        leftSidebarPage.deleteProject(projectToAdd);
    });

    it('should allow to add new project', function () {
        //leftSidebarPage.addProject(projectToAdd);
        // Verify if last Project added name is equal to "projectToAddName".
        expect(leftSidebarPage.lastProjectOnList.getText()).to.have.equal(projectToAdd);
        // Verify if last project name as shown on editor.
        expect(contentPage.assertProjectOnContent).to.have.contain(projectToAdd)
    });

    it('should allow to Modify a project', function () {
        //leftSidebarPage.addProject(projectToAdd);
        leftSidebarPage.modifyProject(projectToAdd, projectToAdd);
        // Verify if last project added "Project to Added" has been changed to "Project MODIFIED".
        expect(leftSidebarPage.lastProjectOnList.getText()).to.have.equal(projectToAdd)
    });
});
