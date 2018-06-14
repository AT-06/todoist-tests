// addTask.spec.js
let config = require('../../config.json');
let expect = require('chai').expect;
let loginPage = require('../../pages/loginPage');
let contentPage = require('../../pages/contentPage');
let leftSidebarPage = require('../../pages/leftSidebarPage');
let toolbarPage = require('../../pages/toolbarPage');
let requestManager = require('../../api/requestManager');
let querystring = require('querystring');
let apiCommonActions = require('../../api/APICommonActions');

describe('Acceptance Tests for Task feature, add a task', function () {
    let task = {
        name: 'Task added',
        priority: '3',
        quickPriority: '1'
    };
    let data = {
        name: 'Project to test task'
    };
    let response;
    let status;
    let id;
    let deleteTask;
    let deleteProject;

    //Login application.
    beforeEach(function () {
        response = browser.call(() => {return requestManager.post('/projects', querystring.stringify(data), config.api_Token2)});
        loginPage.login(config.acc2_email, config.acc2_password);
    });

    //Delete task, post condition.
    afterEach(function () {
        status = browser.call(() => {return requestManager.get('/tasks', config.api_Token2)});
        id = apiCommonActions.getTaskId(status.response, task.name);
        deleteTask = browser.call(() => {return requestManager.delete('/tasks/' + id, config.api_Token2)});
        deleteProject = browser.call(() => {return requestManager.delete('/projects/' + response.response.id, config.api_Token2)});
    });

    it('should allow to add a new task to created project', function () {
        // Adding a task with 'Task added' name.
        contentPage.addTask(task.name, task.priority, data.name);
        expect(contentPage.assertTaskOnContent(task.name));
        expect(contentPage.assertTaskOnContentPriority(task.name));
    });

    it('should allow to add a quick task', function () {
        // Adding and deleting a task.
        toolbarPage.addQuickTask(task.name, task.quickPriority, data.name);
        expect(contentPage.assertTaskOnContent(task.name));
        expect(contentPage.assertTaskOnContentPriority(task.name));
    });
});


