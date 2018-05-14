// task.spec.js
let config = require('../config.json');
let expect = require('chai').expect;
let loginPage = require('../pages/LoginPage');
let contentPage = require('../pages/ContentPage');
let toolbarPage = require('../pages/ToolbarPage');
let taskAdded = 'Task added';
let taskModified = 'Task MODIFIED';
let taskToBeDeleted = 'Task to be deleted';
let quickTaskAdded = 'Quick task added';

describe('Acceptance Tests for Task feature', function () {
    beforeEach(function () {
        loginPage.login(config.acc2_email, config.acc2_password);
    });

    it('should allow to add a new task', function () {
        // Adding a task with 'Task added' name.
        contentPage.addTask(taskAdded);
        expect(contentPage.lastTaskOnList.getText()).to.have.contain(taskAdded);
        // expect(contentPage.assertProjectOnContent).to.have.contain(projectToAdd)
    });

    it('should allow to modify a new task', function () {
        // Adding a task with 'Task added' name.
        contentPage.modifyTask(taskAdded, taskModified);
        expect(contentPage.lastTaskOnList2.getText()).to.have.contain(taskModified)
    });

    it('should allow to delete a task', function () {
        // Adding and deleting a task.
        contentPage.deleteTask(taskToBeDeleted);
        expect(contentPage.lastTaskOnList.getText()).to.have.not.equal(taskToBeDeleted);
    });
    it('should allow to add a quick task', function () {
        // Adding and deleting a task.
        toolbarPage.addQuickTask(quickTaskAdded);
        expect(contentPage.lastTaskOnList2.getText()).to.have.contain(quickTaskAdded);
    });
});
