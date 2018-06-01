// addTask.spec.js
let config = require('../../config.json');
let expect = require('chai').expect;
let loginPage = require('../../pages/LoginPage');
let contentPage = require('../../pages/ContentPage');
let leftSidebarPage = require('../../pages/LeftSidebarPage');
let toolbarPage = require('../../pages/ToolbarPage');


describe('Acceptance Tests for Task feature, add a task', function () {
    let task = {
        name: 'Task added',
        nameForProject: 'Task added to Project',
        project: 'Project for tasks',
        priority: '3'
    };

    //Login application.
    beforeEach(function () {
        loginPage.login(config.acc2_email, config.acc2_password);
        leftSidebarPage.addProject(task.project);
    });

    //Delete task, post condition.
    afterEach(function () {
        contentPage.deleteTask(task.name);
        leftSidebarPage.deleteProject(task.project);
        contentPage.resetLocators();
    });

    it('should allow to add a new task to created project', function () {
        // Adding a task with 'Task added' name.
        contentPage.addTask(task.name, task.priority, task.project);
        expect(contentPage.assertTaskOnContent(task.name));
        expect(contentPage.assertTaskOnContentPriority(task.name));
    });

    it('should allow to add a quick task', function () {
        // Adding and deleting a task.
        toolbarPage.addQuickTask(task.name, task.priority, task.project);
        expect(contentPage.assertTaskOnContent(task.name));
        expect(contentPage.assertTaskOnContentPriority(task.name));
    });
});


