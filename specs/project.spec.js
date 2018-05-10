// project.spec.js
const projectToAddName = 'Project to Added';
const projectToModify = 'Project MODIFIED';
const projectToDelete = 'Project to delete';
let config = require('../config.json');
let expect = require("chai").expect;
let LoginPage = require('../pages/LoginPage'); // update this
let ProjectPage = require('../pages/ProjectPage');


describe('Acceptance Tests to Project feature', function () {
    it('should allow to add new project', function () {
        // Login on website with credentials.
        LoginPage.login(config.email, config.password);
        // Adding new project with name "projectToAddName".
        ProjectPage.addProject(projectToAddName);
        // Verify if last Project added name is equal to "projectToAddName".
        expect(ProjectPage.lastProjectOnList.getText()).to.have.equal(projectToAddName);
        // Verify if last project name as shown on editor.
        expect(ProjectPage.assertOnEditor).to.have.contain(projectToAddName)
    });

    it('should allow to Modify a project', function () {
        // Login on website with credentials.
        LoginPage.login(config.email, config.password);
        // Adding and Modifying one Project.
        ProjectPage.modifyProject(projectToAddName, projectToModify);
        // Verify if last project added "Project to Added" has been changed to "Project MODIFIED".
        expect(ProjectPage.lastProjectOnList.getText()).to.have.equal(projectToModify)
    });

    it('should allow to delete a project', function () {
        // Login on website with credentials.
        LoginPage.login(config.email, config.password);
        // Adding and Deleting one Project".
        ProjectPage.deleteProject(projectToDelete);
        // Verify if last project added "Project to delete" has been deleted.
        expect(ProjectPage.lastProjectOnList.getText()).to.have.not.equal(projectToDelete);
    });
});
