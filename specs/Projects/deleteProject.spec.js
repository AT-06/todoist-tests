// deleteProject.spec.js
let config = require('../../config.json');
let expect = require('chai').expect;
let loginPage = require('../../pages/LoginPage');
let leftSidebarPage = require('../../pages/LeftSidebarPage');
let contentPage = require('../../pages/ContentPage');
let projectToAdd = 'Test Delete Project';

describe('Acceptance Tests to Project feature, delete a project', function () {
    //Login application.
    beforeEach(function () {
        // Login on website with credentials.
        loginPage.login(config.acc1_email, config.acc1_password);
        leftSidebarPage.addProject(projectToAdd);
    });

    it('should allow to delete a project', function () {
        leftSidebarPage.deleteProject(projectToAdd);
        // Verify if last project added "Project to delete" has been deleted.
        expect(leftSidebarPage.lastProjectOnList.getText()).to.not.have.equal(projectToAdd);
    });
});
