let Page = require('./Page');

class TaskPage extends Page {

    // It gets the "Task Name" TextField.
    get taskName() {
        let elementCSS = '#agenda_view  td.text_box_holder div';
        this.actionWaitTo(elementCSS, 0);
        return browser.element(elementCSS);
    }

    // It gets the "+ Add Task" element in Today section.
    get addTaskToday() {
        let elementCSS = '#editor a.action';
        this.actionWaitTo(elementCSS, 10000);
        return browser.element(elementCSS);
    }

    // It does a click on "Add task" button.
    get taskAddSubmit() {
        let elementCSS = '#editor a.ist_button span';
        this.actionWaitTo(elementCSS, 0);
        return browser.element(elementCSS);
    }

    // It gets the 'Delete Task' option after doing right click.
    get optionDeleteTask() {
        let elementCSS = 'body > div:nth-child(21) > table > tbody > tr.menu_item_delete > td';
        this.actionWaitTo(elementCSS, 12000);
        return browser.element(elementCSS);
    }

    // It does
    get deleteTaskButtonConfirmation() {
        let elementCSS = '#GB_window a.ist_button.ist_button_red';
        this.actionWaitTo(elementCSS, 15000);
        return browser.element(elementCSS);
    }

    // Getting size of project list.
    get sizeOfTaskList() {
        return this.taskListOfTasks.elements('li').value.length;
    }

    // Getting Project List on left side bar.
    get taskListOfTasks() {
        let elementCSS = '#agenda_view';
        this.actionWaitTo(elementCSS, 0);
        return browser.element(elementCSS);
    }

    // Getting last project of list
    get lastTaskOnList() {
        let lastTaskIndex = this.sizeOfTaskList - 3;
        return this.taskListOfTasks.elements('li').value[lastTaskIndex];
    }


    actionWaitTo(element, time) {
        browser.pause(time);
        browser.waitForVisible(element)
    }

    addTask(taskName) {
        //  browser.pause(15000);
        this.addTaskToday.click();
        //    browser.pause(15000);
        this.taskName.setValue(taskName);
        this.taskAddSubmit.click();
        browser.pause(3000);
    }

    deleteTask(taskNameToDelete) {

        this.addTask(taskNameToDelete);
        // Deleting the last task added.
        console.log(this.lastTaskOnList.getText());
        if (this.lastTaskOnList.getText().includes(taskNameToDelete)) {
            // show right click menu.
            this.lastTaskOnList.rightClick();
            // Click on "Delete Project".
            this.optionDeleteTask.click();
            // Confirm Delete.
            this.deleteTaskButtonConfirmation.click();
            // Waiting to process.
            browser.pause(3000);
        }
    }
}

module.exports = new TaskPage();
