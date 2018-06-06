// addTask.spec.js
let config = require('../../config.json');
let expect = require('chai').expect;
let loginPage = require('../../pages/LoginPage');
let contentPage = require('../../pages/ContentPage');
let leftSidebarPage = require('../../pages/LeftSidebarPage');
let toolbarPage = require('../../pages/ToolbarPage');
let requestManager = require('../../api/RequestManager');
let querystring = require('querystring');
let apiCommonActions = require('../../api/APICommonActions');

describe('Acceptance Tests for Task feature, add a task', function () {
    let task = {
        name: 'Task added',
        priority: '3'
    };

    let data = {
        name: 'Project to test task'
    };
    let response;
    //Login application.
    beforeEach(function () {
        loginPage.login(config.acc2_email, config.acc2_password);
        response = browser.call(() => {return requestManager.post('/projects', querystring.stringify(data), config.api_Token2)});
    });

    //Delete task, post condition.
    afterEach(function () {
        let status = browser.call(() => {return requestManager.get('/tasks', config.api_Token2)});
        let id = apiCommonActions.getTaskId(status.response, task.name);
        let deleteTask = browser.call(() => {return requestManager.delete('/tasks/' + id, config.api_Token2)});
        let deleteProject = browser.call(() => {return requestManager.delete('/projects/' + response.response.id, config.api_Token2)});
        //browser.refresh();
    });

    it('should allow to add a new task to created project', function () {
        // Adding a task with 'Task added' name.
        contentPage.addTask(task.name, task.priority, data.name);
        expect(contentPage.assertTaskOnContent(task.name));
        expect(contentPage.assertTaskOnContentPriority(task.name));
    });

    it('should allow to add a quick task', function () {
        // Adding and deleting a task.
        toolbarPage.addQuickTask(task.name, task.priority, data.name);
        expect(contentPage.assertTaskOnContent(task.name));
        expect(contentPage.assertTaskOnContentPriority(task.name));
    });
});


