// addProject.spec.js
let config = require('../../config.json');
let expect = require('chai').expect;
let loginPage = require('../../pages/loginPage');
let leftSidebarPage = require('../../pages/leftSidebarPage');
let contentPage = require('../../pages/contentPage');
let requestManager = require('../../api/requestManager');
let apiCommonActions = require('../../api/APICommonActions');

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
        let status = browser.call(() => {return requestManager.get('/projects', config.api_Token1)});
        let id = apiCommonActions.getProjectId(status.response, project.name);
        let deleteProject = browser.call(() => {return requestManager.delete('/projects/' + id, config.api_Token1)});
    });

    it('should allow to add new project', function () {
        leftSidebarPage.addProject(project.name);
        // Verify if last Project added name is equal to "projectToAddName".
        expect(leftSidebarPage.lastProjectOnList.getText()).to.have.equal(project.name);
        // Verify if last project name as shown on editor.
        expect(contentPage.assertProjectOnContent).to.have.contain(project.name)
    });
});
