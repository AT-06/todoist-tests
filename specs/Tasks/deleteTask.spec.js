// deleteTask.spec.js
let config = require('../../config.json');
let expect = require('chai').expect;
let loginPage = require('../../pages/LoginPage');
let contentPage = require('../../pages/ContentPage');
let leftSidebarPage = require('../../pages/LeftSidebarPage');
let taskNameToBeDeleted = 'Task to delete';
let projectForTasks = 'Project for tasks';
let taskPriority = '2';

describe('Acceptance Tests for Task feature Delete', function () {
    //Login and add a new task.
    beforeEach(function () {
        loginPage.login(config.acc2_email, config.acc2_password);
        leftSidebarPage.addProject(projectForTasks);
        contentPage.addTask(taskNameToBeDeleted, taskPriority, projectForTasks);
    });

    //Delete project, post condition.
    afterEach(function () {
        leftSidebarPage.deleteProject(projectForTasks);
    });

    it('should allow to delete a task', function () {
        // Adding and deleting a task.
        contentPage.deleteTask(taskNameToBeDeleted);
        expect(!contentPage.assertTaskOnContent(taskNameToBeDeleted));
    });
});
