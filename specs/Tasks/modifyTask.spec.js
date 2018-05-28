// modifyTask.spec.js
let config = require('../../config.json');
let expect = require('chai').expect;
let loginPage = require('../../pages/LoginPage');
let contentPage = require('../../pages/ContentPage');
let taskNameAdded = 'Task added';
let taskNameModified = 'Task MODIFIED';

describe('Acceptance Tests for Task feature modify', function () {
/*    //Login and add a new task.
    beforeEach(function () {
        loginPage.login(config.acc2_email, config.acc2_password);
        contentPage.addTask(taskNameAdded);
    });

    //Delete task, post condition.
    afterEach(function () {
        contentPage.deleteTask(taskNameModified);
    });

    it('should allow to modify a new task', function () {
        // Adding a task with 'Task added' name.
        if (taskNameAdded === taskNameModified) {
            return taskNameModified;
        }
        contentPage.modifyTask(taskNameAdded, taskNameModified);
        expect(contentPage.assertTaskOnContent(taskNameModified));
    });*/
});