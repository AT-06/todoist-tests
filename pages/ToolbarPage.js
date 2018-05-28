let componentAction = require('../utils/ComponentAction');
let leftSidebarPage = require('../pages/LeftSidebarPage');

class ToolbarPage {
    constructor() {
        this.quickTaskAdd = '#quick_add_task_holder';
        this.quickTaskTextField = '#quick_add_task .sel_richtext_editor';
        this.quickTaskAddButton = '#quick_add_task .submit_btn';
        this.quickSearchTextField = '.quick_find.fixed_pos';
        this.showResultButton = '.auto_complete_search';
        this.list = 'div#ist_complete_floater';
    }

    clickQuickAddTAskButton() {
        browser.pause(4000);
        componentAction.waitToLoading();
        componentAction.clickElement(this.quickTaskAdd);
    }

    setTaskTextField(taskName) {
        componentAction.setElementValue(this.quickTaskTextField, taskName);
    }

    clickAddTaskButton() {
        componentAction.clickElement(this.quickTaskAddButton);
        leftSidebarPage.goToCurrentSection();
        browser.pause(5000);
    }

    addQuickTask(taskName) {
        this.clickQuickAddTAskButton();
        this.setTaskTextField(taskName);
        this.clickAddTaskButton();
    }

    setElement(elementName) {
        componentAction.setElementValue(this.quickSearchTextField, elementName);
    }

    clickShowResult() {
        componentAction.clickElement(this.showResultButton);
    }

    doQuickSearch(elementName) {
        this.setElement(elementName);
        this.clickShowResult();
    }
}

module.exports = new ToolbarPage;