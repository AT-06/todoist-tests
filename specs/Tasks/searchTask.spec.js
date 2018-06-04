// searchTask.spec.js
let config = require('../../config.json');
let expect = require('chai').expect;
let loginPage = require('../../pages/LoginPage');
let contentPage = require('../../pages/ContentPage');
let toolbarPage = require('../../pages/ToolbarPage');
let leftSidebarPage = require('../../pages/LeftSidebarPage');

describe('Acceptance Tests for Task feature modify', function () {
    let task = {
        name: 'Search task',
        project: 'Project for tasks',
        priority: '3'
    };
    //Login and add a new task.
    beforeEach(function () {
        loginPage.login(config.acc2_email, config.acc2_password);
        leftSidebarPage.addProject(task.project);
        contentPage.addTask(task.name, task.priority, task.project);
    });

    //Delete task, post condition.
    afterEach(function () {
        contentPage.deleteTask(task.name);
        leftSidebarPage.deleteProject(task.project);
        //leftSidebarPage.deleteProject(taskToSearch);
    });

    it('should allow to do a quick search', function () {
        // Adding and deleting a task.
        toolbarPage.doQuickSearch(task.name);
        expect(contentPage.assertTaskOnContent(task.name));
    });
});