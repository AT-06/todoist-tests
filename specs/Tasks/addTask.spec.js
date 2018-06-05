// addTask.spec.js
let config = require('../../config.json');
let expect = require('chai').expect;
let loginPage = require('../../pages/LoginPage');
let contentPage = require('../../pages/ContentPage');
let leftSidebarPage = require('../../pages/LeftSidebarPage');
let toolbarPage = require('../../pages/ToolbarPage');
let requestManager = require('../../api/RequestManager');
let querystring = require('querystring');

describe('Acceptance Tests for Task feature, add a task', function () {
    let task = {
        name: 'Task added',
        nameForProject: 'Task added to Project',
        project: 'Project for tasks',
        priority: '3'
    };

    let data = {
        name: 'Project to test task'
    };


    //Login application.
    beforeEach(function () {
        loginPage.login(config.acc2_email, config.acc2_password);
        return requestManager.post('/projects', querystring.stringify(data), config.api_Token2);
    });

    //Delete task, post condition.
    afterEach(function () {
        return requestManager.get('/tasks', task.name, config.api_Token2);
        return requestManager.get('/projects', data.name, config.api_Token2);
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


