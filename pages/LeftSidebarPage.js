let contentPage = require('../pages/ContentPage');
let componentAction = require('../utils/ComponentAction');
let currentSection = '.filter.current';

class LeftSidebarPage {
    constructor() {
        this.projectNameTextField = '#projects_list div.richtext_editor.sel_richtext_editor';
        this.projectMenu = '#projects_list_manager a.action.sel_add_project';
        this.projectAddSubmit = '#projects_list a.ist_button.ist_button_red.submit_btn';
        this.projectListOnLeftSidebar = '#projects_list';
        this.projectModifyOption = 'td[data-track="projects|menu_edit"]';
        this.projectSaveButton = 'a[data-track="projects|edit_confirm"]';
        this.projectDeleteOption = 'td[data-track="projects|menu_delete"]';//'#menu_delete_text';
        this.leftMenu = '#left_menu';
        this.menuHideButton = '#top_bar_inner > a > img';
        this.projectsList = '#projects_list';
        this.todaySection = 'li[data-track="navigation|today"]';
    }
    get lastProjectOnList() {
        return componentAction.lastElementOnList(this.projectListOnLeftSidebar, 1);
    }

    closeModalTimeZone() {
        browser.pause(5000);
        componentAction.waitToLoading();
        contentPage.closeTimeZoneAlert();
    }
    verifyEnvironment() {
        if (LeftSidebarPage.isMobile()) {
            componentAction.clickElement(this.menuHideButton);
        }
    }
    clickAddProjectLink() {
        componentAction.moveToComponent(this.leftMenu);
        componentAction.clickElement(this.projectMenu);
    }
    fillProjectName(projectName) {
        componentAction.setElementValue(this.projectNameTextField, projectName);
    }
    clickAddProjectButton() {
        componentAction.clickElement(this.projectAddSubmit);
        browser.pause(5000);
    }

    // This method is to add new project.
    addProject(projectName) {
        this.closeModalTimeZone();
        this.verifyEnvironment();
        this.clickAddProjectLink();
        this.fillProjectName(projectName);
        this.clickAddProjectButton();
        componentAction.clickElement(this.todaySection);


    }

    chooseProjectAction(element) {
        this.lastProjectOnList.rightClick();
        componentAction.moveToComponent(element);
        componentAction.clickElement(element);
    }

    acceptDeleteProject() {
        componentAction.clickModalDeleteButton();
        browser.pause(5000);
    }

    clickSaveProjectButton() {
        componentAction.clickElement(this.projectSaveButton);
        browser.pause(5000);
    }
    // This method is to modify one project.
    modifyProject(projectNameToModify, newProjectName) {
        this.closeModalTimeZone();
        this.verifyEnvironment();
        // Adding new project to modify.
        if (this.lastProjectOnList.getText() === projectNameToModify) {
            this.chooseProjectAction(this.projectModifyOption);
            this.fillProjectName(newProjectName);
            this.clickSaveProjectButton();
        }
    }

    // This method is to delete a project.
    deleteProject(projectNameToDelete) {
        this.closeModalTimeZone();
        this.verifyEnvironment();
        // Adding new project to delete.
        if (this.lastProjectOnList.getText().includes(projectNameToDelete)) {
            this.chooseProjectAction(this.projectDeleteOption);
            this.acceptDeleteProject();
        }
    }

    static isMobile() {
        let width = browser.getViewportSize('width');
        return width < 640;
    }

    goToCurrentSection() {
        componentAction.clickElement(currentSection);
    }

    assertTaskInProject(taskName, projectForTasks) {
        contentPage.clickProjectFromList(projectForTasks, this.projectsList);
        return contentPage.assertTaskOnContent(taskName);
    }

}

module.exports = new LeftSidebarPage();
