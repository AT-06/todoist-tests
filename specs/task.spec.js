// task.spec.js
const taskAdded = 'Task added';
const taskToBeDeleted = 'Task to be deleted';
let config = require('../config.json');
let expect = require("chai").expect;
let LoginPage = require('../pages/LoginPage');
let TaskPage = require('../pages/TaskPage');

describe('Acceptance Tests for Task feature', function () {
    it('should allow to add a new task', function () {
        // Login into todoist.com with valid credentials.
        LoginPage.login(config.email, config.password);
        // Adding a task with 'Task added' name.
        TaskPage.addTask(taskAdded);
        // expect(TaskPage.lastTaskOnList.getText()).to.have.equal('Task added\nInbox');
    });

    it('should allow to delete a task', function () {
        // Login into todoist.com with valid credentials.
        LoginPage.login(config.email, config.password);
        // Adding and deleting a task.
        TaskPage.deleteTask(taskToBeDeleted);
    });
});
