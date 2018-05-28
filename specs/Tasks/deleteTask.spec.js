// deleteTask.spec.js
let config = require('../../config.json');
let expect = require('chai').expect;
let loginPage = require('../../pages/LoginPage');
let contentPage = require('../../pages/ContentPage');
let tasknameToBeDeleted = 'Task to delete';

describe('Acceptance Tests for Task feature Delete', function () {
    beforeEach(function () {
        loginPage.login(config.acc2_email, config.acc2_password);
        contentPage.addTask(tasknameToBeDeleted);
    });
    it('should allow to delete a task', function () {
        // Adding and deleting a task.
        contentPage.deleteTask(tasknameToBeDeleted);
        expect(!contentPage.assertTaskOnContent(tasknameToBeDeleted));
    });
});
