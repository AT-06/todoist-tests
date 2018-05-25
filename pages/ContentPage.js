let componentAction = require('../utils/ComponentAction');

class ContentPage {
    constructor() {
        this.taskNameTextField = '.richtext_editor.sel_richtext_editor'; //'#agenda_view  td.text_box_holder div';
        this.addTaskToday = '.agenda_add_task , .pe_controller .action';//'#editor a.action';
        this.taskAddSubmit = '#editor a.ist_button span';
        this.taskModifyOption = 'div:nth-child(21) > table > tbody > tr.menu_item_edit > td';
        this.taskSaveButton = ' a.ist_button.ist_button_red.submit_btn';
        this.optionDeleteTask = 'tr.menu_item_delete:nth-child(13)';
        this.optionDeleteTaskFromProject = '.sel_delete_task.menu_item_delete';
        this.taskList = '#agenda_view , .current_editor';
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

    addTask(taskName) {
        componentAction.waitToLoading();
        ContentPage.closeTimeZoneAlert();
        if (!browser.isVisible(this.taskAddSubmit)) {
            componentAction.moveToComponent(this.addTaskToday);
            componentAction.clickElement(this.addTaskToday);
        }
        componentAction.setValueElement(this.taskNameTextField, taskName);
        let locators = [this.priority, this.flag, this.taskAddSubmit];
        componentAction.clickManyElements(locators);
        /*componentAction.clickElement(this.priority);
        componentAction.clickElement(this.flag);
        componentAction.clickElement(this.taskAddSubmit);*/
        browser.pause(5000);
    }

    modifyTask(taskNameToModify, newTaskName) {
        componentAction.waitToLoading();
        let elementToModify = componentAction.elementOnList(this.taskList, taskNameToModify);
        componentAction.rightClickElement(elementToModify);
        componentAction.selectFillAndSummit(this.taskModifyOption, this.taskNameTextField, this.taskSaveButton, newTaskName);
        /*componentAction.clickElement(this.taskModifyOption, );
        componentAction.setValueElement(this.taskNameTextField, newTaskName);
        componentAction.clickElement(this.taskSaveButton);*/
        browser.pause(5000);
    }

    deleteTask(taskNameToDelete) {
        componentAction.waitToLoading();
        let elementToDelete = componentAction.elementOnList(this.taskList, taskNameToDelete);
        componentAction.rightClickElement(elementToDelete)
        if (browser.isVisible(this.optionDeleteTask)) {
            componentAction.clickElement(this.optionDeleteTask);
        } else {
            componentAction.clickElement(this.optionDeleteTaskFromProject);
        }
        componentAction.clickModalDeleteButton();
        browser.pause(5000);
    }

    static closeTimeZoneAlert(){
        if (browser.isVisible(this.timeZoneAlert)){
            componentAction.clickElement(this.closeTimeZoneAlertButton);/**/
        }
    }
}

module.exports = new ContentPage();
