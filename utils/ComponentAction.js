const loading = '#loading';
const introTask = '#GB_window';
const introTaskButton = '#GB_window img.cmp_small_close';
const timeToWait = 30000;
const modalDeleteButton = "#GB_window a.ist_button.ist_button_red";

class ComponentAction {

    // Return is a element visible and existing.
    static isElementReady(elementCSS) {
        //browser.waitUntil();
        browser.waitUntil(function () {
            return browser.isVisible(elementCSS) && browser.isExisting(elementCSS);
        }, timeToWait);
        //return elementReady;
    }

    // Return a element.
    static getElement(elementCSS) {
        this.isElementReady(elementCSS, timeToWait);
        return browser.element(elementCSS);
    }

    // Click to element.
    static clickElement(elementCSS) {
        this.isElementReady(elementCSS, timeToWait);
        browser.element(elementCSS).click();
    }

    // Right click to element.
    static rightClickElement(element) {
        element.rightClick();

    }

    // Set value to TextField element.
    static setValueElement(elementCSS, value) {
        this.isElementReady(elementCSS, timeToWait);
        browser.element(elementCSS).setValue(value);
    }

    // Return the last element on list.
    static lastElementOnList(elementCSS, difference) {
        let lasElement = this.getElement(elementCSS, timeToWait);
        let lastProjectIndex = lasElement.elements('li').value.length - difference;
        return lasElement.elements('li').value[lastProjectIndex];

    }

    // Return the last element on list.
    static elementOnList(elementCSS, elementName) {
        let elementToReturn = null;
        this.getElement(elementCSS, timeToWait).elements('span').value.forEach(element => {
            if (element.getText().includes(elementName)) {
                elementToReturn = element;
            }
        });
        return elementToReturn;
    }

    // Wait to loading introduction at home.
    static waitToLoading() {
        browser.waitForExist(loading, timeToWait, true);
        if (browser.isVisible(introTask)) {
            browser.element(introTaskButton).click();
        }
        browser.waitForExist(introTask, timeToWait, true);
    }

    // Modal method for deleting a project or a task.
    static clickModalDeleteButton() {
        this.clickElement(modalDeleteButton);
    }

    static moveToComponent(elementCss) {
        if (this.isElementReady(elementCss)) {
            browser.moveToObject(elementCss);
        }
    }
}

module.exports = ComponentAction;
