// searchTask.spec.js
let config = require('../../config.json');
let expect = require('chai').expect;
let loginPage = require('../../pages/LoginPage');
let contentPage = require('../../pages/ContentPage');
let toolbarPage = require('../../pages/ToolbarPage');
let leftSidebarPage = require('../../pages/LeftSidebarPage');
let taskToSearch = 'Search task';
let projectForTasks = 'Project for tasks';
let taskPriority = '3';

describe('Acceptance Tests for Task feature modify', function () {
    //Login and add a new task.
    beforeEach(function () {
        loginPage.login(config.acc2_email, config.acc2_password);
        leftSidebarPage.addProject(projectForTasks);
        contentPage.addTask(taskToSearch, taskPriority, projectForTasks);
    });

    //Delete task, post condition.
    afterEach(function () {
        contentPage.deleteTask(taskToSearch);
        leftSidebarPage.deleteProject(projectForTasks);
        //leftSidebarPage.deleteProject(taskToSearch);
    });

    it('should allow to do a quick search', function () {
        // Adding and deleting a task.
        toolbarPage.doQuickSearch(taskToSearch);
        expect(contentPage.assertTaskOnContent(taskToSearch));
    });
});