// searchTask.spec.js
let config = require('../../config.json');
let expect = require('chai').expect;
let loginPage = require('../../pages/LoginPage');
let contentPage = require('../../pages/ContentPage');
let toolbarPage = require('../../pages/ToolbarPage');
let leftSidebarPage = require('../../pages/LeftSidebarPage');
let requestManager = require('../../api/RequestManager');
let querystring = require('querystring');
let apiCommonActions = require('../../api/APICommonActions');

describe('Acceptance Tests for Task feature modify', function () {
    let task = {
        name: 'Search task',
        project: 'Project for tasks',
        priority: '3'
    };
    let data = {
        name: 'Project to test delete task'
    };
    let response;
    let status;
    let id;
    let deleteTask;
    let deleteProject;

    //Login and add a new task.
    beforeEach(function () {
        response = browser.call(() => {return requestManager.post('/projects', querystring.stringify(data), config.api_Token2)});
        loginPage.login(config.acc2_email, config.acc2_password);
        //leftSidebarPage.addProject(task.project);
        contentPage.addTask(task.name, task.priority, data.name);
    });

    //Delete task, post condition.
    afterEach(function () {
        status = browser.call(() => {return requestManager.get('/tasks', config.api_Token2)});
        id = apiCommonActions.getTaskId(status.response, data.name);
        deleteTask = browser.call(() => {return requestManager.delete('/tasks/' + id, config.api_Token2)});
        deleteProject = browser.call(() => {return requestManager.delete('/projects/' + response.response.id, config.api_Token2)});
    });

    it('should allow to do a quick search', function () {
        // Adding and deleting a task.
        toolbarPage.doQuickSearch(task.name);
        expect(contentPage.assertTaskOnContent(task.name));
    });
});