const projectNameTextField = '#projects_list div.richtext_editor.sel_richtext_editor';
const projectMenu = '#projects_list_manager a.action.sel_add_project';
const projectAddSubmit = '#projects_list a.ist_button.ist_button_red.submit_btn';
const projectListOnLeftSidebar = '#projects_list';
const projectModifyOption = 'td[data-track="projects|menu_edit"]';
const projectSaveButton = 'a[data-track="projects|edit_confirm"]';
const projectDeleteOption = '#menu_delete_text';
const projectDeleteConfirmation = '#GB_window a.ist_button.ist_button_red';
let Page = require('./Page');
let componentAction = require('../utils/ComponentAction');
let timeToWait = 30000;


class LeftSidebarPage extends Page {

    get lastProjectOnList() {
        return componentAction.lastElementOnList(projectListOnLeftSidebar, timeToWait,1);
    }

    // This method is to add new project.
    addProject(projectName) {
        browser.pause(4000);
        componentAction.waitToLoading(timeToWait);
        componentAction.clickElement(projectMenu, timeToWait);
        componentAction.setValueElement(projectNameTextField, projectName, timeToWait)
        componentAction.clickElement(projectAddSubmit, timeToWait);
        browser.pause(5000);
    }

    // This method is to modify one project.
    modifyProject(projectNameToModify, newProjectName) {
        componentAction.waitToLoading( timeToWait);
        // Adding new project to modify.
        this.addProject(projectNameToModify);
        if (this.lastProjectOnList.getText() === projectNameToModify) {
            this.lastProjectOnList.rightClick();
            componentAction.clickElement(projectModifyOption, timeToWait);
            componentAction.setValueElement(projectNameTextField, newProjectName, timeToWait);
            componentAction.clickElement(projectSaveButton, timeToWait);
            browser.pause(5000);
        }
    }

    // This method is to delete a project.
    deleteProject(projectNameToDelete) {
        componentAction.waitToLoading( timeToWait);
        // Adding new project to delete.
        this.addProject(projectNameToDelete);
        if (this.lastProjectOnList.getText().includes(projectNameToDelete)) {
            this.lastProjectOnList.rightClick();
            componentAction.clickElement(projectDeleteOption, timeToWait);
            componentAction.clickElement(projectDeleteConfirmation, timeToWait);
            browser.pause(5000);
        }
    }
}

module.exports = new LeftSidebarPage();
