const projectNameTextField = '#projects_list div.richtext_editor.sel_richtext_editor';
const projectMenu = '#projects_list_manager a.action.sel_add_project';
const projectAddSubmit = '#projects_list a.ist_button.ist_button_red.submit_btn';
const projectListOnLeftSidebar = '#projects_list';
const projectModifyOption = 'td[data-track="projects|menu_edit"]';
const projectSaveButton = 'a[data-track="projects|edit_confirm"]';
const projectDeleteOption = '#menu_delete_text';
const projectDeleteConfirmation = '#GB_window a.ist_button.ist_button_red';
const menuHideButton = '#top_bar_inner > a > img';
let Page = require('./Page');
let contentPage = require('../pages/ContentPage');
let componentAction = require('../utils/ComponentAction');

class LeftSidebarPage extends Page {

    get lastProjectOnList() {
        return componentAction.lastElementOnList(projectListOnLeftSidebar, 1);
    }

    // This method is to add new project.
    addProject(projectName) {
        contentPage.closeTimeZoneAlert();
        browser.pause(5000);
        componentAction.waitToLoading();
        if (this.isMobile()) {
            componentAction.clickElement(menuHideButton);
        }
        browser.moveToObject('#left_menu');
        componentAction.clickElement(projectMenu);
        componentAction.setValueElement(projectNameTextField, projectName);
        componentAction.clickElement(projectAddSubmit);
        browser.pause(5000);
    }

    // This method is to modify one project.
    modifyProject(projectNameToModify, newProjectName) {
        componentAction.waitToLoading();
        if (this.isMobile()) {
            componentAction.clickElement(menuHideButton);
        }
        // Adding new project to modify.
        if (this.lastProjectOnList.getText() === projectNameToModify) {
            this.lastProjectOnList.rightClick();
            componentAction.clickElement(projectModifyOption);
            componentAction.setValueElement(projectNameTextField, newProjectName);
            componentAction.clickElement(projectSaveButton);
            browser.pause(5000);
        }
    }

    // This method is to delete a project.
    deleteProject(projectNameToDelete) {
        componentAction.waitToLoading();
        if (this.isMobile()) {
            componentAction.clickElement(menuHideButton);
        }
        // Adding new project to delete.
        if (this.lastProjectOnList.getText().includes(projectNameToDelete)) {
            this.lastProjectOnList.rightClick();
            componentAction.clickElement(projectDeleteOption,);
            componentAction.clickElement(projectDeleteConfirmation);
            browser.pause(5000);
        }
    }

    isMobile() {
        var width = browser.getViewportSize('width');

        return width < 640;

    }
}

module.exports = new LeftSidebarPage();
