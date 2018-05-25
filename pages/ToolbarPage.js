let componentAction = require('../utils/ComponentAction');

class ToolbarPage {
    constructor() {
        this.quickTaskAdd = '#quick_add_task_holder';
        this.quickTaskTextField = '#quick_add_task div.richtext_editor.sel_richtext_editor';
        this.quickTaskAddButton = '#quick_add_task a.ist_button.ist_button_red.submit_btn';
    }
    addQuickTask(taskName) {
        browser.pause(4000);
        componentAction.waitToLoading();
        componentAction.selectFillAndSummit(this.quickTaskAdd, this.quickTaskTextField, this.quickTaskAddButton, taskName);
        componentAction.clickElement(this.quickTaskAdd);
        componentAction.setValueElement(this.quickTaskTextField, taskName);
        componentAction.clickElement(this.quickTaskAddButton);
        browser.pause(5000);
    }
}

module.exports = new ToolbarPage;
