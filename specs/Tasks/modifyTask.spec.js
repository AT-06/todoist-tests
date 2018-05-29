// modifyTask.spec.js
let config = require('../../config.json');
let expect = require('chai').expect;
let loginPage = require('../../pages/LoginPage');
let contentPage = require('../../pages/ContentPage');
let leftSidebarPage = require('../../pages/LeftSidebarPage');
let taskNameAdded = 'Task added';
let taskNameModified = 'Task MODIFIED';
let projectForTasks = 'Project for tasks';
let projectForTasksModified = 'Project for tasks Modified';
let taskPriority = '3';
let taskPriorityModified = '1';

describe('Acceptance Tests for Task feature modify', function () {
    //Login and add a new task.
    beforeEach(function () {
        loginPage.login(config.acc2_email, config.acc2_password);
        leftSidebarPage.addProject(projectForTasksModified);
        leftSidebarPage.addProject(projectForTasks);
        contentPage.addTask(taskNameAdded, taskPriority, projectForTasks, '4');
    });

    //Delete task, post condition.
    afterEach(function () {
        //contentPage.deleteTask(taskNameModified);
        //leftSidebarPage.deleteProject(projectForTasks);
    });

    it('should allow to modify a new task', function () {
        // Adding a task with 'Task added' name.
        contentPage.modifyTask(taskNameAdded, taskNameModified, projectForTasks, projectForTasksModified, taskPriority, taskPriorityModified);
        expect(contentPage.assertTaskOnProject(taskNameModified, projectForTasksModified));
        expect(contentPage.assertTaskOnContentPriority(taskNameModified));
    });
});