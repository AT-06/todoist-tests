let Page = require('./Page');
let componentAction = require('../utils/ComponentAction');

class ContentPage extends Page {

    // Getting element of Project Name on Editor.
    get projectOnEditor() {
        let elementCSS = '#editor a.project_link';
        return componentAction.returnElementCSS(elementCSS, 2000);
    }
    
    // Getting String Project Name on Editor.
    get assertOnEditor() {
        let assert = '';
        this.projectOnEditor.elements('span').value.forEach(project => {
            assert = project.getText();
        });
        return assert;
    }

    // It gets the "Task Name" TextField.
    get taskName() {
        let elementCSS = '#agenda_view  td.text_box_holder div';
        return componentAction.returnElementCSS(elementCSS, 0);
    }

    // It gets the "+ Add Task" element in Today section.
    get addTaskToday() {
        let elementCSS = '#editor a.action';
        return componentAction.returnElementCSS(elementCSS, 5000);
    }

    // It does a click on "Add task" button.
    get taskAddSubmit() {
        let elementCSS = '#editor a.ist_button span';
        return componentAction.returnElementCSS(elementCSS, 0);
    }

    // It gets the 'Delete Task' option after doing right click.
    get optionDeleteTask() {
        let elementCSS = 'tr.menu_item_delete:nth-child(13) > td';
        return componentAction.returnElementCSS(elementCSS, 2000);
    }

    // It does
    get deleteTaskButtonConfirmation() {
        let elementCSS = '#GB_window a.ist_button.ist_button_red';
        return componentAction.returnElementCSS(elementCSS, 5000);
    }

    // Getting size of project list.
    get sizeOfTaskList() {
        return this.taskListOfTasks.elements('li').value.length;
    }

    // Getting Project List on left side bar.
    get taskListOfTasks() {
        let elementCSS = '#agenda_view';
        return componentAction.returnElementCSS(elementCSS, 0);
    }

    // Getting last project of list
    get lastTaskOnList() {
        let lastTaskIndex = this.sizeOfTaskList - 3;
        return this.taskListOfTasks.elements('li').value[lastTaskIndex];
    }

    addTask(taskName) {
        this.addTaskToday.click();
        this.taskName.setValue(taskName);
        this.taskAddSubmit.click();
        browser.pause(5000);
    }

    modifyTask(taskNameToModify, newTaskName) {
        this.addTask(taskNameToModify);
        if (this.lastTaskOnList.getText() === taskNameToModify) {
            this.lastTaskOnList.rightClick();
            browser.pause(5000);
        }
    }

    deleteTask(taskNameToDelete) {
        this.addTask(taskNameToDelete);
        // Deleting the last task added.
        if (this.lastTaskOnList.getText().includes(taskNameToDelete)) {
            // show right click menu.
            this.lastTaskOnList.rightClick();
            // Click on "Delete Project".
            this.optionDeleteTask.click();
            // Confirm Delete.
            this.deleteTaskButtonConfirmation.click();
            // Waiting to process.
            browser.pause(5000);
        }
    }
}

module.exports = new ContentPage();
