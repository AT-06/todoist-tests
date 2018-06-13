// deleteTask.spec.js
let config = require('../../config.json');
let expect = require('chai').expect;
let loginPage = require('../../pages/loginPage');
let contentPage = require('../../pages/contentPage');
let leftSidebarPage = require('../../pages/leftSidebarPage');
let requestManager = require('../../api/requestManager');
let querystring = require('querystring');


describe('Acceptance Tests for Task feature Delete', function () {
    let task = {
        nameToBeDeleted: 'Task to delete',
        project: 'Project for tasks',
        priority: '3'
    };

    let data = {
        name: 'Project to test delete task'
    };
    let response;
    let deleteProject;

    //Login and add a new task.
    beforeEach(function () {
        response = browser.call(() => {return requestManager.post('/projects', querystring.stringify(data), config.api_Token2)});
        loginPage.login(config.acc2_email, config.acc2_password);
        contentPage.addTask(task.nameToBeDeleted, task.priority, data.name);
    });

    //Delete project, post condition.
    afterEach(function () {
        deleteProject = browser.call(() => {return requestManager.delete('/projects/' + response.response.id, config.api_Token2)});
    });

    it('should allow to delete a task', function () {
        // Adding and deleting a task.
        contentPage.deleteTask(task.nameToBeDeleted);
        expect(!contentPage.assertTaskOnContent(task.nameToBeDeleted));
    });
});
