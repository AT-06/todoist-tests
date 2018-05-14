const quickTaskAdd = '#quick_add_task_holder';
const quickTaskTextField = '#quick_add_task div.richtext_editor.sel_richtext_editor';
const quickTaskAddButton = '#quick_add_task a.ist_button.ist_button_red.submit_btn';

let Page = require('./Page');
let componentAction = require('../utils/ComponentAction');

class ToolbarPage extends Page {
    addQuickTask(taskName) {
        browser.pause(4000);
        componentAction.waitToLoading();
        componentAction.clickElement(quickTaskAdd);
        componentAction.setValueElement(quickTaskTextField, taskName);
        componentAction.clickElement(quickTaskAddButton);
        browser.pause(5000);
    }
}

module.exports = new ToolbarPage;
