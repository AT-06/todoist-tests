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
        let element = componentAction.elementOnList(this.taskList, task);
        return (element != null) ? (element.getText === task) : false;
    }

    //Do visible add task.
    clickAddTaskLink() {
        componentAction.waitToLoading();
        ContentPage.closeTimeZoneAlert();
        if (!browser.isVisible(this.taskAddSubmit)) {
            componentAction.moveToComponent(this.addTaskToday);
            componentAction.clickElement(this.addTaskToday);
        }
    }

    //Fill the task textField.
    setTaskNameTextField(taskName) {
        componentAction.setValueElement(this.takNameTextField, taskName);

    }

    //
    selectPriorityFlag() {
        componentAction.clickElement(this.priority);
        componentAction.clickElement(this.flag);
    }


    clickAddButton() {
        componentAction.clickElement(this.taskAddSubmit);
        browser.pause(5000);
    }

    addTask(taskName) {
        this.clickAddTaskLink();
        this.setTaskNameTextField(taskName);
        this.selectPriorityFlag();
        this.clickAddButton();
    }

    selectTaskAtTheList(taskSelected) {
        componentAction.waitToLoading();
        let element = componentAction.elementOnList(this.taskList, taskSelected);
        componentAction.rightClickElement(element);
    }

    clickSubMenuEditOption() {
        componentAction.clickElement(this.taskModifyOption,);
    }

    clickSaveButton() {
        componentAction.clickElement(this.taskSaveButton);
        browser.pause(5000);
    }

    modifyTask(taskNameToModify, newTaskName) {
        this.selectTaskAtTheList(taskNameToModify);
        this.clickSubMenuEditOption();
        this.setTaskNameTextField(newTaskName);
        this.clickSaveButton();
    }

    clickSubMenuDeleteOption() {
        componentAction.clickElement(this.optionDeleteTask);
    }

    clickDeleteButtonModalMenu() {
        componentAction.clickModalDeleteButton();
        browser.pause(5000);
    }

    deleteTask(taskNameToDelete) {
        this.selectTaskAtTheList(taskNameToDelete);
        this.clickSubMenuDeleteOption();
        this.clickDeleteButtonModalMenu();
    }

    static closeTimeZoneAlert() {
        if (browser.isVisible(this.timeZoneAlert)) {
            componentAction.clickElement(this.closeTimeZoneAlertButton);
        }
    }
}

module.exports = new ContentPage();
