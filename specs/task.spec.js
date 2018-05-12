// task.spec.js
let config = require('../config.json');
let expect = require('chai').expect;
let loginPage = require('../pages/LoginPage');
let contentPage = require('../pages/ContentPage');

describe('Acceptance Tests for Task feature', function () {
    beforeEach(function () {
        loginPage.login(config.acc2_email, config.acc2_password);
    });

    it('should allow to add a new task', function () {
        // Adding a task with 'Task added' name.
        contentPage.addTask(config.taskAdded);
    });

    it('should allow to delete a task', function () {
        // Adding and deleting a task.
        contentPage.deleteTask(config.taskToBeDeleted);
    });
});
