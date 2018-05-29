// addTask.spec.js
let config = require('../../config.json');
let expect = require('chai').expect;
let loginPage = require('../../pages/LoginPage');
let contentPage = require('../../pages/ContentPage');
let leftSidebarPage = require('../../pages/LeftSidebarPage');
let toolbarPage = require('../../pages/ToolbarPage');
let taskNameAdded = 'Task added';
let taskNameAddedProject = 'Task added to Project';
let projectForTasks = 'Project for tasks';
let taskPriority = '3';

describe('Acceptance Tests for Task feature, add a task', function () {
    //Login application.
    beforeEach(function () {
        loginPage.login(config.acc2_email, config.acc2_password);
        leftSidebarPage.addProject(projectForTasks);
    });

    //Delete task, post condition.
    afterEach(function () {
        contentPage.deleteTask(taskNameAdded);
        leftSidebarPage.deleteProject(projectForTasks);
        contentPage.resetLocators();
    });

    it('should allow to add a new task to created project', function () {
        // Adding a task with 'Task added' name.
        contentPage.addTask(taskNameAdded, taskPriority, projectForTasks, '4');
        expect(contentPage.assertTaskOnContent(taskNameAdded));
        expect(contentPage.assertTaskOnContentPriority(taskNameAdded));
    });

    it('should allow to add a quick task', function () {
        // Adding and deleting a task.
        toolbarPage.addQuickTask(taskNameAdded, taskPriority, projectForTasks);
        expect(contentPage.assertTaskOnContent(taskNameAdded));
        expect(contentPage.assertTaskOnContentPriority(taskNameAdded));
    });
});


