// addProject.spec.js
let config = require('../../config.json');
let expect = require('chai').expect;
let loginPage = require('../../pages/LoginPage');
let leftSidebarPage = require('../../pages/LeftSidebarPage');
let contentPage = require('../../pages/ContentPage');
let requestManager = require('../../api/RequestManager');

describe('Acceptance Tests to Project feature, add a project', function () {
    let project = {
        name: 'Test Project'
    };

    //Login application.
    beforeEach(function () {
        loginPage.login(config.acc1_email, config.acc1_password);
    });

    //Delete project, post condition.
    afterEach(function () {
        //leftSidebarPage.deleteProject(project.name);
        //return requestManager.get('/projects', project.name, config.api_Token1);
        let call = browser.call(requestManager.get('/projects', project.name, config.api_Token1));
    });

    it('should allow to add new project', function () {
        leftSidebarPage.addProject(project.name);
        // Verify if last Project added name is equal to "projectToAddName".
        expect(leftSidebarPage.lastProjectOnList.getText()).to.have.equal(project.name);
        // Verify if last project name as shown on editor.
        expect(contentPage.assertProjectOnContent).to.have.contain(project.name)
    });
});
