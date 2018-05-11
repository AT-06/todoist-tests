// project.spec.js
let config = require('../config.json');
let expect = require("chai").expect;
let LoginPage = require('../pages/LoginPage'); // update this
let ProjectPage = require('../pages/ProjectPage');


describe('Acceptance Tests to Project feature', function () {
    beforeEach(function () {
        // Login on website with credentials.
        LoginPage.login(config.acc1_email, config.acc1_password);
    });

    it('should allow to add new project', function () {
        ProjectPage.addProject(config.projectToAdd);
        // Verify if last Project added name is equal to "projectToAddName".
        expect(ProjectPage.lastProjectOnList.getText()).to.have.equal(config.projectToAdd);
        // Verify if last project name as shown on editor.
        expect(ProjectPage.assertOnEditor).to.have.contain(config.projectToAdd)
    });

    it('should allow to Modify a project', function () {
        ProjectPage.modifyProject(config.projectToAdd, config.projectToModify);
        // Verify if last project added "Project to Added" has been changed to "Project MODIFIED".
        expect(ProjectPage.lastProjectOnList.getText()).to.have.equal(config.projectToModify)
    });

    it('should allow to delete a project', function () {
        ProjectPage.deleteProject(config.projectToDelete);
        // Verify if last project added "Project to delete" has been deleted.
        expect(ProjectPage.lastProjectOnList.getText()).to.have.not.equal(config.projectToDelete);
    });
});
