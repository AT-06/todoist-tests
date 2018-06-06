let componentAction = require('../utils/ComponentAction');

class ContentPage {

    constructor() {
        this.taskNameTextField = '.richtext_editor.sel_richtext_editor';
        this.addTaskToday = '.agenda_add_task , .pe_controller .action';
        this.taskAddSubmit = '#editor a.ist_button span';
        this.taskModifyOption = 'div:not([style*="display: none;"]) td[data-track="task|more_edit"]';
        this.taskSaveButton = ' a.ist_button.ist_button_red.submit_btn';
        this.optionDeleteTask = 'div:not([style*="display: none;"]) td[data-track="task|more_delete"]';//'tr.menu_item_delete:nth-child(13)';
        this.taskList = '#agenda_view , .current_editor';
        this.projectOnContent = '#editor a.project_link';
        this.timeZoneAlert = '#GB_window';
        this.closeTimeZoneAlertButton = '.close span';
        this.termsDialog = '.terms_dialog';
        this.agreeTermsButton = '.terms_dialog .ist_button';
        this.flag = '.form_action_icon';
        this.priority = '//div[contains(@class,"ist_menu priority_menu")]//img[contains(@class,"NUMPRIORITY")]';
        this.taskPriority = 'img[data-track="task_form|priority"]';
        this.taskToProjectButton = '.cmp_project.form_action_icon';
        this.projectsListForTask = '#ist_complete_result';
        this.projectListOnLeftSidebar = '#projects_list';
        this.modalText = '.text_holder';
        this.closeProjectNotFoundAlert = '.ist_button.ist_button_red';
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
        this.lastProjectOnList().click();
        let assert = '';
        this.getProjectOnContent.elements('span').value.forEach(project => {
            assert = project.getText();
        });
        return assert;
    }

    // Getting String Project Name on Editor.
    assertTaskOnContent(task) {
        //this.lastProjectOnList().click();
        let element = componentAction.elementOnList(this.taskList, task);
        return (element != null) ? (element.getText === task) : false;
    }

    // Getting String Project Name on Editor.
    assertTaskOnProject(task, projectForTasksModified) {
        let project = componentAction.elementOnList(this.projectListOnLeftSidebar, projectForTasksModified);
        project.click();
        let element = componentAction.elementOnList(this.taskList, task);
        return (element != null) ? (element.getText === task) : false;
    }

    clickLastTask(task) {
        let element = componentAction.elementOnList(this.taskList, task);
        element.click();
    }

    assertTaskOnContentPriority(task) {
        this.clickLastTask(task);
        let ret = browser.isVisible(this.flag);
        this.lastProjectOnList().click();
        return ret;
    }

    clickAddTaskLink() {
        componentAction.waitToLoading();
        this.closeTermsOfService();
        this.closeTimeZoneAlert();
        if (!browser.isVisible(this.taskAddSubmit)) {
            componentAction.clickElement(this.addTaskToday);
        }
    }
    closeTermsOfService() {
        if(browser.isVisible(this.termsDialog)) {
            componentAction.clickElement(this.agreeTermsButton);
        }
    }

    setTaskNameTextField(taskName) {
        componentAction.setElementValue(this.taskNameTextField, taskName);
    }

    selectPriorityFlag(priority) {
        componentAction.clickElement(this.taskPriority);
        componentAction.clickElement(this.setPriorityLevel(priority));
        this.setFlagValue(this.taskPriority.replace(priority));
    }

    clickSelectProject() {
        componentAction.clickElement(this.taskToProjectButton);
    }

    setPriorityLevel(priority) {
        return this.priority.replace("NUMPRIORITY", priority);
    }

    setFlagValue(newPriority) {
        this.flag = newPriority.concat(this.flag);
    }

    clickProjectFromList(projectForTasks, locator) {
        let element = componentAction.elementOnList(locator, projectForTasks);
        element.click();
    }

    clickAddButton() {
        componentAction.clickElement(this.taskAddSubmit);
        browser.pause(5000);
    }

    addTask(taskName, priority, projectForTasks) {
        //leftSidebarPage.returnToTodaySection();
        browser.refresh();
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
        element.rightClick();
    }

    clickSubMenuEditOption() {
        componentAction.clickElement(this.taskModifyOption);
    }

    clickSaveButton() {
        componentAction.clickElement(this.taskSaveButton);
        browser.pause(5000);
    }

    modifyTask(taskNameToModify, newTaskName, projectNameToModify, newProjectName, newTaskPriority) {
        this.lastProjectOnList().click();
        this.selectTaskAtTheList(taskNameToModify);
        this.clickSubMenuEditOption();
        this.setTaskNameTextField(newTaskName);

        this.selectPriorityFlag(newTaskPriority);
        this.clickSelectProject();
        this.clickProjectFromList(newProjectName, this.projectsListForTask);
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
            /*if(componentAction.getElement(this.modalText).getText() == 'Project not found') {
                componentAction.clickElement(this.closeProjectNotFoundAlert);
            } else {*/
                componentAction.clickElement(this.closeTimeZoneAlertButton);
            //}
        }
    }

    resetLocators() {
        this.flag = '.form_action_icon';
        this.priority = '.ist_menu.priority_menu ';
    }


}

module.exports = new ContentPage();
