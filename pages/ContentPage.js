const takNameTextField = '#agenda_view  td.text_box_holder div';
const addTaskToday = '#editor a.action';
const taskAddSubmit = '#editor a.ist_button span';
const taskModifyOption = 'div:nth-child(21) > table > tbody > tr.menu_item_edit > td';
const taskSaveButton = ' a.ist_button.ist_button_red.submit_btn';
const taskNameTextField = '#agenda_view > div > ul > li.manager.indent_1 > form > table:nth-child(1) > tbody > tr > td > table > tbody > tr > td.text_box_holder > div';
const optionDeleteTask = 'tr.menu_item_delete:nth-child(13) > td';
const deleteTaskButtonConfirmation = '#GB_window a.ist_button.ist_button_red';
const taskList = '#agenda_view';
const projectOnContent = '#editor a.project_link';
const timeZoneAlert = '#GB_window';
const closeTimeZoneAlertLink = 'a.timezone_link:nth-child(4)';
let Page = require('./Page');
let componentAction = require('../utils/ComponentAction');

class ContentPage extends Page {

    // Getting element of Project Name on Editor.
    get projectOnContent() {
        return componentAction.getElement(projectOnContent);
    }

    // Getting String Project Name on Editor.
    get assertProjectOnContent() {
        let assert = '';
        this.projectOnContent.elements('span').value.forEach(project => {
            assert = project.getText();
        });
        return assert;
    }

    // Getting String Project Name on Editor.
    assertTaskOnContent(task) {
        let element = componentAction.elementOnList(taskList, task);
        return element.getText === task;

    }

    addTask(taskName) {
        browser.pause(4500);
        componentAction.waitToLoading();
        if (browser.isVisible(addTaskToday)) {
            componentAction.clickElement(addTaskToday);
        }
        componentAction.setValueElement(takNameTextField, taskName)
        componentAction.clickElement(taskAddSubmit);
        browser.pause(5000);
    }

    modifyTask(taskNameToModify, newTaskName) {
        componentAction.waitToLoading();
        let elementToModify = componentAction.elementOnList(taskList, taskNameToModify);
        componentAction.rightClickElement(elementToModify);
        componentAction.clickElement(taskModifyOption, );
        componentAction.setValueElement(taskNameTextField, newTaskName);
        componentAction.clickElement(taskSaveButton);
        browser.pause(5000);
    }

    deleteTask(taskNameToDelete) {
        componentAction.waitToLoading();
        let elementToDelete = componentAction.elementOnList(taskList, taskNameToDelete);
        componentAction.rightClickElement(elementToDelete);
        componentAction.clickElement(optionDeleteTask);
        componentAction.clickElement(deleteTaskButtonConfirmation);
        browser.pause(5000);

    }

    closeTimeZoneAlert(){
        if (browser.isVisible(timeZoneAlert)){
            componentAction.clickElement(closeTimeZoneAlertLink);
        }
    }
}

module.exports = new ContentPage();
