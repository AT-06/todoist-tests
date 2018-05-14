// task.spec.js
let config = require('../config.json');
let expect = require('chai').expect;
let loginPage = require('../pages/LoginPage');
let contentPage = require('../pages/ContentPage');
let toolbarPage = require('../pages/ToolbarPage');
let taskNameAdded = 'Task added';
let taskNameModified = 'Task MODIFIED';
let tasknameToBeDeleted = 'Task to be deleted';
let quickTaskNameAdded = 'Quick task added';
let quickTaskNameModified = 'Quick Task MODIFIED';
let quickTasknameToBeDeleted = 'Quick Task to be deleted';

describe('Acceptance Tests for Task feature', function () {
    beforeEach(function () {
        loginPage.login(config.acc2_email, config.acc2_password);
    });

    it('should allow to add a new task', function () {
        // Adding a task with 'Task added' name.
        contentPage.addTask(taskNameAdded);
        expect(contentPage.lastTaskOnList.getText()).to.have.contain(taskNameAdded);
        // expect(contentPage.assertProjectOnContent).to.have.contain(projectToAdd)
    });

    it('should allow to modify a new task', function () {
        // Adding a task with 'Task added' name.
        contentPage.addTask(taskNameAdded);
        contentPage.modifyTask(taskNameAdded, taskNameModified);
        expect(contentPage.lastTaskOnList2.getText()).to.have.contain(taskNameModified)
    });

    it('should allow to delete a task', function () {
        // Adding and deleting a task.
        contentPage.addTask(taskNameAdded);
        contentPage.deleteTask(tasknameToBeDeleted);
        expect(contentPage.lastTaskOnList.getText()).to.have.not.equal(tasknameToBeDeleted);
    });
    it('should allow to add a quick task', function () {
        // Adding and deleting a task.
        toolbarPage.addQuickTask(quickTaskNameAdded);
        expect(contentPage.lastTaskOnList2.getText()).to.have.contain(quickTaskNameAdded);
    });



    it('should allow to modify a quick task', function () {
        // Adding a task with 'Task added' name.
        contentPage.modifyTask(quickTaskNameAdded, quickTaskNameModified);
        expect(contentPage.lastTaskOnList2.getText()).to.have.contain(taskNameModified)
    });

    it('should allow to delete a quick task', function () {
        // Adding and deleting a task.
        contentPage.deleteTask(quickTasknameToBeDeleted);
        expect(contentPage.lastTaskOnList.getText()).to.have.not.equal(tasknameToBeDeleted);
    });
});
