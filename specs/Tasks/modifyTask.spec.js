// modifyTask.spec.js
let config = require('../../config.json');
let expect = require('chai').expect;
let loginPage = require('../../pages/LoginPage');
let contentPage = require('../../pages/ContentPage');
let leftSidebarPage = require('../../pages/LeftSidebarPage');
let requestManager = require('../../api/RequestManager');
let querystring = require('querystring');
let apiCommonActions = require('../../api/APICommonActions');

describe('Acceptance Tests for Task feature modify', function () {
    let task = {
      name : 'Task added',
      nameModified : 'Task MODIFIED',
      priority : '3',
      priorityModified : '1'
    };
    let project = {
        name: 'Project for tasks'
    };
    let projectModify = {
        name: 'Project for tasks Modified'
    };
    let responseProject;
    let responseProjectModify;
    let status;
    let id;
    let deleteTask;
    let deleteProject;

    //Login and add a new task.
    beforeEach(function () {
        responseProjectModify = browser.call(() => {return requestManager.post('/projects', querystring.stringify(projectModify), config.api_Token2)});
        responseProject = browser.call(() => {return requestManager.post('/projects', querystring.stringify(project), config.api_Token2)});
        loginPage.login(config.acc2_email, config.acc2_password);
        contentPage.addTask(task.name, task.priority, project.name, '4');
    });

    //Delete task, post condition.
    afterEach(function () {
        status = browser.call(() => {return requestManager.get('/tasks', config.api_Token2)});
        id = apiCommonActions.getTaskId(status.response, task.nameModified);
        deleteTask = browser.call(() => {return requestManager.delete('/tasks/' + id, config.api_Token2)});
        deleteProject = browser.call(() => {return requestManager.delete('/projects/' + responseProjectModify.response.id, config.api_Token2)});
        deleteProject = browser.call(() => {return requestManager.delete('/projects/' + responseProject.response.id, config.api_Token2)});
    });

    it('should allow to modify a new task', function () {
        // Adding a task with 'Task added' name.
        contentPage.modifyTask(task.name, task.nameModified, project.name, projectModify.name, task.priorityModified);
        expect(contentPage.assertTaskOnProject(task.nameModified, projectModify.name));
        expect(contentPage.assertTaskOnContentPriority(task.nameModified));
    });
});