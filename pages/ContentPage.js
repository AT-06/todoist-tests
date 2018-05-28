let componentAction = require('../utils/ComponentAction');

class ContentPage {
    constructor() {
        this.taskNameTextField = '.richtext_editor.sel_richtext_editor'; //'#agenda_view  td.text_box_holder div';
        this.addTaskToday = '.agenda_add_task , .pe_controller .action';//'#editor a.action';
        this.taskAddSubmit = '#editor a.ist_button span';
        this.taskModifyOption = 'div:nth-child(21) > table > tbody > tr.menu_item_edit > td';
        this.taskSaveButton = ' a.ist_button.ist_button_red.submit_btn';

        this.optionDeleteTask = 'div:not([style*="display: none;"]) td[data-track="task|more_delete"]';//'tr.menu_item_delete:nth-child(13)';

        this.optionDeleteTaskFromProject = '.sel_delete_task.menu_item_delete';
        this.taskList = '#agenda_view , .current_editor';
        this.projectOnContent = '#editor a.project_link';
        this.timeZoneAlert = '#GB_window';
        this.closeTimeZoneAlertLink = 'a.timezone_link:nth-child(4)';
        this.closeTimeZoneAlertButton = '.close span';
        this.priority = '.ist_menu.priority_menu .cmp_priority1';
        this.flag = '.cmp_priority4.form_action_icon';
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

    clickAddTaskLink() {
        componentAction.waitToLoading();
        this.closeTimeZoneAlert();
        if (!browser.isVisible(this.taskAddSubmit)) {
            componentAction.moveToComponent(this.addTaskToday);
            componentAction.clickElement(this.addTaskToday);
        }
    }

    setTaskNameTextField(taskName) {
        componentAction.setElementValue(this.taskNameTextField, taskName);
    }

    selectPriorityFlag(priority) {
        componentAction.clickElement(this.flag);
        componentAction.clickElement(this.priority);
    }
    
    clickAddButton() {
        componentAction.clickElement(this.taskAddSubmit);
        browser.pause(5000);
    }

    addTask(taskName, priority) {
        this.clickAddTaskLink();
        this.setTaskNameTextField(taskName);
        this.selectPriorityFlag(priority);
        this.clickAddButton();
    }

    selectTaskAtTheList(taskSelected) {
        componentAction.waitToLoading();
        let element = componentAction.elementOnList(this.taskList, taskSelected);
        //componentAction.rightClickElement(element);
        element.rightClick();
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
        componentAction.moveToComponent(this.optionDeleteTask);
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

    closeTimeZoneAlert() {
        if (browser.isVisible(this.timeZoneAlert)) {
            componentAction.clickElement(this.closeTimeZoneAlertButton);
        }
    }
}

module.exports = new ContentPage();
