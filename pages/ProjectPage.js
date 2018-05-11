let Page = require('./Page');
let obtain = require('../utils/ProjectTaskLib');

class ProjectPage extends Page {
    // Getting "Project Name" TextField.
    get projectName() {
        let elementCSS = '#projects_list div.richtext_editor.sel_richtext_editor';
        return obtain.returnElementCSS(elementCSS, 0);
    }

    // Getting "+ Add Project" element.
    get projectMenu() {
        let elementCSS = '#projects_list_manager a.action.sel_add_project';
        return obtain.returnElementCSS(elementCSS, 5000);
    }

    // Getting "Add Project" button.
    get projectAddSubmit() {
        let elementCSS = '#projects_list a.ist_button.ist_button_red.submit_btn';
        return obtain.returnElementCSS(elementCSS, 0);
    }

    // Getting Project List on left side bar.
    get projectListOfProjects() {
        let elementCSS = '#projects_list';
        return obtain.returnElementCSS(elementCSS, 0);
    }

    // Getting "Delete Project" option on right click menu.
    get optionDeleteOnMenu() {
        let elementCSS = '#menu_delete_text';
        return obtain.returnElementCSS(elementCSS, 2000);
    }

    // Getting element of Project Name on Editor.
    get projectOnEditor() {
        let elementCSS = '#editor a.project_link';
        return obtain.returnElementCSS(elementCSS, 2000);
    }

    // Getting String Project Name on Editor.
    get assertOnEditor() {
        let assert = '';
        this.projectOnEditor.elements('span').value.forEach(project => {
            assert = project.getText();
        });
        return assert;
    }

    // Getting button to modify project.
    get saveModifyButton() {
        let elementCSS = 'a[data-track="projects|edit_confirm"]';
        this.actionWaitTo(elementCSS, 0);
        return browser.element(elementCSS);
    }

    // Getting "Delete" button to confirm deleting.
    get deleteProjectButtonConfirmation() {
        let elementCSS = '#GB_window a.ist_button.ist_button_red';
        return obtain.returnElementCSS(elementCSS, 5000);
    }

    // Getting "Edit Project" option on right menu (NOT WORKING).
    get optionModifyOnMenu() {
        let elementCSS = 'td[data-track="projects|menu_edit"]';
        return obtain.returnElementCSS(elementCSS, 5000);
    }

    // Getting "Edit Project" option on right menu (NOT WORKING).
    get textOfProjectNameToModify() {
        let elementCSS = '#projects_list div.richtext_editor.sel_richtext_editor';
        return obtain.returnElementCSS(elementCSS, 5000);
    }

    // Getting size of project list.
    get sizeOfProjectList() {
        return this.projectListOfProjects.elements('li').value.length;
    }

    // Getting last project of list
    get lastProjectOnList() {
        let lastProjectIndex = this.sizeOfProjectList - 1;
        return this.projectListOfProjects.elements('li').value[lastProjectIndex];
    }

    // This method is to wait a element.
    actionWaitTo(element, time) {
        // Waiting to process.
        browser.pause(time);
        // Waiting to element.
        browser.waitForVisible(element)
    }

    // This method is to add new project.
    addProject(projectName) {
        // Click on "+Add Project" to show textField project name.
        this.projectMenu.click();
        // Putting new name to project
        this.projectName.setValue(projectName);
        // Adding new project.
        this.projectAddSubmit.click();
        // Waiting to process.
        browser.pause(3000);
    }

    // This method is to modify one project.
    modifyProject(projectNameToModify, newProjectName) {
        // Adding new project to modify.
        this.addProject(projectNameToModify);
        // Modifying the last project added.
        if (this.lastProjectOnList.getText() === projectNameToModify) {
            // show right click menu.
            this.lastProjectOnList.rightClick();
            // Click on "Edit Project".
            this.optionModifyOnMenu.click();
            // Updating project name.
            this.textOfProjectNameToModify.setValue(newProjectName);
            // Saving new name.
            this.saveModifyButton.click();
            // Waiting to process.
            browser.pause(3000);
        }
    }

    // This method is to delete a project.
    deleteProject(projectNameToDelete) {
        // Adding new project to delete.
        this.addProject(projectNameToDelete);
        // Deleting the last project added.
        if (this.lastProjectOnList.getText() === projectNameToDelete) {
            // show right click menu.
            this.lastProjectOnList.rightClick();
            // Click on "Delete Project".
            this.optionDeleteOnMenu.click();
            // Confirm Delete.
            this.deleteProjectButtonConfirmation.click();
            // Waiting to process.
            browser.pause(3000);
        }
    }
}

module.exports = new ProjectPage();
