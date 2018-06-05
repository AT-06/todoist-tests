// deleteTask.spec.js
let config = require('../../config.json');
let expect = require('chai').expect;
let loginPage = require('../../pages/LoginPage');
let contentPage = require('../../pages/ContentPage');
let leftSidebarPage = require('../../pages/LeftSidebarPage');
let requestManager = require('../../api/RequestManager');
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

    //Login and add a new task.
    beforeEach(function () {
        loginPage.login(config.acc2_email, config.acc2_password);
        leftSidebarPage.addProject(task.project);
        contentPage.addTask(task.nameToBeDeleted, task.priority, data.name);
    });

    //Delete project, post condition.
    afterEach(function () {
        //leftSidebarPage.deleteProject(task.project);
        return requestManager.get('/projects', data.name, config.api_Token2);
    });

    it('should allow to delete a task', function () {
        // Adding and deleting a task.
        contentPage.deleteTask(task.nameToBeDeleted);
        expect(!contentPage.assertTaskOnContent(task.nameToBeDeleted));
    });
});
