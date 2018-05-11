// task.spec.js
let config = require('../config.json');
let expect = require("chai").expect;
let LoginPage = require('../pages/LoginPage');
let TaskPage = require('../pages/TaskPage');

describe('Acceptance Tests for Task feature', function () {
    beforeEach(function () {
        LoginPage.login(config.acc2_email, config.acc2_password);
    });

    it('should allow to add a new task', function () {
        // Adding a task with 'Task added' name.
        TaskPage.addTask(config.taskAdded);
        // expect(TaskPage.lastTaskOnList.getText()).to.have.equal('Task added\nInbox');
    });


    it('should allow to delete a task', function () {
        // Adding and deleting a task.
        TaskPage.deleteTask(config.taskToBeDeleted);
    });
});
