let componentAction = require('../utils/ComponentAction');

class ContentPage {

    constructor() {
        this.taskNameTextField = '.richtext_editor.sel_richtext_editor'; //'#agenda_view  td.text_box_holder div';
        this.addTaskToday = '.agenda_add_task , .pe_controller .action';//'#editor a.action';
        this.taskAddSubmit = '#editor a.ist_button span';
        this.taskModifyOption = 'div:nth-child(21) > table > tbody > tr.menu_item_edit > td';
        this.taskSaveButton = ' a.ist_button.ist_button_red.submit_btn';
        this.optionDeleteTask = 'div:not([style*="display: none;"]) td[data-track="task|more_delete"]';//'tr.menu_item_delete:nth-child(13)';
        this.taskList = '#agenda_view , .current_editor';
        this.projectOnContent = '#editor a.project_link';
        this.timeZoneAlert = '#GB_window';
        this.closeTimeZoneAlertButton = '.close span';
        this.priority = '.ist_menu.priority_menu ';
        this.flag = '.cmp_priority4.form_action_icon';
        this.taskPriority = '.cmp_priority';
        this.taskToProjectButton = '.cmp_project.form_action_icon';
        this.projectsListForTask = '#ist_complete_result';

        this.projectListOnLeftSidebar = '#projects_list';
    }
    lastProjectOnList() {
        return componentAction.lastElementOnList(this.projectListOnLeftSidebar, 1);
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
        this.lastProjectOnList().click();
        let element = componentAction.elementOnList(this.taskList, task);
        return (element != null) ? (element.getText === task) : false;
    }

    assertTaskOnContentPriority(task) {
        let element = componentAction.elementOnList(this.taskList, task);
        element.click();
        let ret = browser.isVisible(this.flag);
        this.lastProjectOnList().click();
        return ret;
    }

    clickAddTaskLink() {
        componentAction.waitToLoading();
        this.closeTimeZoneAlert();
        if (!browser.isVisible(this.taskAddSubmit)) {
            componentAction.clickElement(this.addTaskToday);
        }
    }

    setTaskNameTextField(taskName) {
        componentAction.setElementValue(this.taskNameTextField, taskName);
    }

    selectPriorityFlag(priority) {
        this.priority = this.priority.concat(this.taskPriority.concat(priority));
        componentAction.clickElement(this.flag);
        componentAction.clickElement(this.priority);
        this.flag = this.flag.replace('.cmp_priority4', this.taskPriority.concat(priority));
    }

    clickAddButton() {
        componentAction.clickElement(this.taskAddSubmit);
        browser.pause(5000);
    }

    addTask(taskName, priority, projectForTasks) {
        this.clickAddTaskLink();
        this.setTaskNameTextField(taskName);
        this.selectPriorityFlag(priority);
        this.clickSelectProject();
        this.clickProjectFromList(projectForTasks, this.projectsListForTask);
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

    clickSelectProject() {
        componentAction.clickElement(this.taskToProjectButton);
    }

    clickProjectFromList(projectForTasks, locator) {
        let element = componentAction.elementOnList(locator, projectForTasks);
        element.click();
    }

    addTaskToExistingProject(taskName, projectForTasks, taskPriority) {
        this.clickAddTaskLink();
        this.setTaskNameTextField(taskName);
        this.selectPriorityFlag(taskPriority);
        this.clickSelectProject();
        this.clickProjectFromList(projectForTasks, this.projectsListForTask);
        this.clickAddButton();
    }


}

module.exports = new ContentPage();
