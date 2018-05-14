const loading = '#loading';
const introTask = '#GB_window';
const introTaskButton = '#GB_window img.cmp_small_close';
const timeToWait = 30000;

class ComponentAction {

    // Return is a element visible and existing.
    isElementReady(elementCSS) {
        let elementReady = browser.waitUntil(function () {
            return browser.isVisible(elementCSS) && browser.isExisting(elementCSS);
        }, timeToWait);
        return elementReady;
    }

    // Return a element.
    getElement(elementCSS) {
        if (this.isElementReady(elementCSS, timeToWait)) {
            return browser.element(elementCSS);
        }
    }

    // Click to element.
    clickElement(elementCSS) {
        if (this.isElementReady(elementCSS, timeToWait)) {
            browser.element(elementCSS).click();
        }
    }

    // Right click to element.
    rightClickElement(element) {
        element.rightClick();

    }

    // Set value to TextField element.
    setValueElement(elementCSS, value) {
        if (this.isElementReady(elementCSS, timeToWait)) {
            browser.element(elementCSS).setValue(value);
        }
    }

    // Return the last element on list.
    lastElementOnList(elementCSS, difference) {
        let lasElement = this.getElement(elementCSS, timeToWait);
        let lastProjectIndex = lasElement.elements('li').value.length - difference;
        return lasElement.elements('li').value[lastProjectIndex];

    }

    // Return the last element on list.
    elementOnList(elementCSS, elementName) {
        let elementToReturn = null;
        this.getElement(elementCSS, timeToWait).elements('span').value.forEach(element => {
            if (element.getText().includes(elementName)) {
                elementToReturn = element;
            }
        });
        return elementToReturn;
    }

    // Wait to loading introduction at home.
    waitToLoading() {
        browser.waitForExist(loading, timeToWait, true);
        if (browser.isVisible(introTask)) {
            browser.element(introTaskButton).click();
        }
        browser.waitForExist(introTask, timeToWait, true);
    }

}

module.exports = new ComponentAction();
