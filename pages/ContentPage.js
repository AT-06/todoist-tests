const takNameTextField = '#agenda_view  td.text_box_holder div';
const addTaskToday = '#editor a.action';
const taskAddSubmit = '#editor a.ist_button span';
const optionDeleteTask = 'tr.menu_item_delete:nth-child(13) > td';
const deleteTaskButtonConfirmation = '#GB_window a.ist_button.ist_button_red';
const taskList = '#agenda_view';
let Page = require('./Page');
let componentAction = require('../utils/ComponentAction');
let timeToWait = 30000;

class ContentPage extends Page {

    // Getting element of Project Name on Editor.
    get projectOnEditor() {
        let elementCSS = '#editor a.project_link';
        return componentAction.getElement(elementCSS, timeToWait);
    }

    // Getting String Project Name on Editor.
    get assertProjectOnContent() {
        let assert = '';
        this.projectOnEditor.elements('span').value.forEach(project => {
            assert = project.getText();
        });
        return assert;
    }

    // Getting last project of list
    get lastTaskOnList() {
        return componentAction.lastElementOnList(taskList, timeToWait, 3);
    }

    addTask(taskName) {
        browser.pause(4000);
        componentAction.waitToLoading(timeToWait);
        componentAction.clickElement(addTaskToday, timeToWait);
        componentAction.setValueElement(takNameTextField, taskName, timeToWait)
        componentAction.clickElement(taskAddSubmit, timeToWait);
        browser.pause(5000);
    }

    modifyTask(taskNameToModify, newTaskName) { // please finish this.
        browser.waitForVisible('#loading', timeToWait, true);
        this.addTask(taskNameToModify);
        if (this.lastTaskOnList.getText() === taskNameToModify) {
            this.lastTaskOnList.rightClick();
            browser.pause(5000);
        }
    }

    deleteTask(taskNameToDelete) {
        componentAction.waitToLoading(timeToWait);
        // Adding new project to delete.
        this.addTask(taskNameToDelete);
        if (this.lastTaskOnList.getText().includes(taskNameToDelete)) {
            this.lastTaskOnList.rightClick();
            componentAction.clickElement(optionDeleteTask, timeToWait);
            componentAction.clickElement(deleteTaskButtonConfirmation, timeToWait);
            browser.pause(5000);
        }
    }
}

module.exports = new ContentPage();
