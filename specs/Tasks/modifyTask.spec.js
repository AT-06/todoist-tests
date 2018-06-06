// modifyTask.spec.js
let config = require('../../config.json');
let expect = require('chai').expect;
let loginPage = require('../../pages/LoginPage');
let contentPage = require('../../pages/ContentPage');
let leftSidebarPage = require('../../pages/LeftSidebarPage');

describe('Acceptance Tests for Task feature modify', function () {
    let task = {
      name : 'Task added',
      nameModified : 'Task MODIFIED',
      project : 'Project for tasks',
      projectModified : 'Project for tasks Modified',
      priority : '3',
      priorityModified : '1'
    };
    //Login and add a new task.
    beforeEach(function () {
        loginPage.login(config.acc2_email, config.acc2_password);
        leftSidebarPage.addProject(task.projectModified);
        leftSidebarPage.addProject(task.project);
        contentPage.addTask(task.name, task.priority, task.project, '4');
    });

    //Delete task, post condition.
    afterEach(function () {
        //contentPage.deleteTask(taskNameModified);
        //leftSidebarPage.deleteProject(projectForTasks);
    });

    it('should allow to modify a new task', function () {
        // Adding a task with 'Task added' name.
        contentPage.modifyTask(task.name, task.nameModified, task.project, task.projectModified, task.priorityModified);
        expect(contentPage.assertTaskOnProject(task.nameModified, task.projectModified));
        expect(contentPage.assertTaskOnContentPriority(task.nameModified));
    });
});