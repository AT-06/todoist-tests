// project.spec.js
let config = require('../config.json');
let expect = require('chai').expect;
let loginPage = require('../pages/LoginPage');
let leftSidebarPage = require('../pages/LeftSidebarPage');
let contentPage = require('../pages/ContentPage');
let projectToAdd = 'Project to Added';
let projectToModify = 'Project MODIFIED';
let projectToDelete = 'Project to delete';


describe('Acceptance Tests to Project feature', function () {
    beforeEach(function () {
        // Login on website with credentials.
        loginPage.login(config.acc1_email, config.acc1_password);
    });

    it('should allow to add new project', function () {
        contentPage.closeTimeZoneAlert();
        leftSidebarPage.addProject(projectToAdd);

        // Verify if last Project added name is equal to "projectToAddName".
        expect(leftSidebarPage.lastProjectOnList.getText()).to.have.equal(projectToAdd);
        // Verify if last project name as shown on editor.
        expect(contentPage.assertProjectOnContent).to.have.contain(projectToAdd)
    });

    it('should allow to Modify a project', function () {
        leftSidebarPage.addProject(projectToAdd);
        leftSidebarPage.modifyProject(projectToAdd, projectToModify);
        // Verify if last project added "Project to Added" has been changed to "Project MODIFIED".
        expect(leftSidebarPage.lastProjectOnList.getText()).to.have.equal(projectToModify)
    });

    it('should allow to delete a project', function () {
        leftSidebarPage.addProject(projectToDelete);
        leftSidebarPage.deleteProject(projectToDelete);
        // Verify if last project added "Project to delete" has been deleted.
        expect(leftSidebarPage.lastProjectOnList.getText()).to.have.not.equal(projectToDelete);
    });
});
