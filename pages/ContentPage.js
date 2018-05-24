let componentAction = require('../utils/ComponentAction');

class ContentPage {
    constructor() {
        this.takNameTextField = '#agenda_view  td.text_box_holder div';
        this.addTaskToday = '#editor a.action';
        this.taskAddSubmit = '#editor a.ist_button span';
        this.taskModifyOption = 'div:nth-child(21) > table > tbody > tr.menu_item_edit > td';
        this.taskSaveButton = ' a.ist_button.ist_button_red.submit_btn';
        this.taskNameTextField = '#agenda_view > div > ul > li.manager.indent_1 > form > table:nth-child(1) > tbody > tr > td > table > tbody > tr > td.text_box_holder > div';
        this.optionDeleteTask = 'tr.menu_item_delete:nth-child(13) > td';
        this.taskList = '#agenda_view';
        this.projectOnContent = '#editor a.project_link';
        ContentPage.timeZoneAlert = '#GB_window';
        ContentPage.closeTimeZoneAlertLink = 'a.timezone_link:nth-child(4)';
        ContentPage.closeTimeZoneAlertButton = '.close span';
        this.priority = '.cmp_priority4.form_action_icon';
        this.flag = '.ist_menu.priority_menu .cmp_priority1';
    }
    // Getting element of Project Name on Editor.
    get getProjectOnContent() {
        return componentAction.getElement(this.projectOnContent);
    }

    // Getting String Project Name on Editor.
    get assertProjectOnContent() {
        let assert = '';
        this.getProjectOnContent.elements('span').value.forEach(project => {
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
        componentAction.waitToLoading();
        ContentPage.closeTimeZoneAlert();
        componentAction.moveToComponent(this.addTaskToday)
        if (browser.isVisible(this.addTaskToday)) {
            componentAction.clickElement(this.addTaskToday);
            componentAction.setValueElement(this.takNameTextField, taskName);
            componentAction.clickElement(this.priority);
            componentAction.clickElement(this.flag);
            componentAction.clickElement(this.taskAddSubmit);
        }
        browser.pause(5000);
    }

    modifyTask(taskNameToModify, newTaskName) {
        componentAction.waitToLoading();
        let elementToModify = componentAction.elementOnList(this.taskList, taskNameToModify);
        componentAction.rightClickElement(elementToModify);
        componentAction.clickElement(this.taskModifyOption, );
        componentAction.setValueElement(this.taskNameTextField, newTaskName);
        componentAction.clickElement(this.taskSaveButton);
        browser.pause(5000);
    }

    deleteTask(taskNameToDelete) {
        componentAction.waitToLoading();
        let elementToDelete = componentAction.elementOnList(this.taskList, taskNameToDelete);
        componentAction.rightClickElement(elementToDelete);
        componentAction.clickElement(this.optionDeleteTask);
        componentAction.clickModalDeleteButton();
        browser.pause(5000);

    }

    static closeTimeZoneAlert(){
        if (browser.isVisible(this.timeZoneAlert)){
            componentAction.clickElement(this.closeTimeZoneAlertButton);//////
        }
    }
}

module.exports = new ContentPage();
