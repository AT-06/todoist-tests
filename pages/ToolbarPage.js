let componentAction = require('../utils/ComponentAction');

class ToolbarPage {
    constructor() {
        this.quickTaskAdd = '#quick_add_task_holder';
        this.quickTaskTextField = '#quick_add_task  .sel_richtext_editor';
        this.quickTaskAddButton = '#quick_add_task .submit_btn';
    }


    clickQuickAddTAskButton() {
        browser.pause(4000);
        componentAction.waitToLoading();
        componentAction.clickElement(this.quickTaskAdd);
    }

    setTaskTextField(taskName) {
        componentAction.setValueElement(this.quickTaskTextField, taskName);

    }

    clickAddTaskButton() {
        componentAction.clickElement(this.quickTaskAddButton);
        browser.pause(5000);
    }

    addQuickTask(taskName) {
        this.clickQuickAddTAskButton();
        this.setTaskTextField(taskName);
        this.clickAddTaskButton();
    }
}

module.exports = new ToolbarPage;
