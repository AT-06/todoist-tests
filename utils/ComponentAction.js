const loading = '#loading';

class ComponentAction {

    // Return a element.
    getElement(elementCSS, time) {
        browser.waitForVisible(elementCSS, time);
        return browser.element(elementCSS);
    }

    // Click to element.
    clickElement(elementCSS, time) {
        browser.waitForVisible(elementCSS, time);
        browser.element(elementCSS).click();
    }

    // Set value to TextField element.
    setValueElement(elementCSS, value, time) {
        browser.waitForVisible(elementCSS, time);
        browser.element(elementCSS).setValue(value);
    }

    // Return the last element on list.
    lastElementOnList(elementCSS, time, difference) {
        let lasElement = this.getElement(elementCSS, time);
        let lastProjectIndex = lasElement.elements('li').value.length - difference;
        return lasElement.elements('li').value[lastProjectIndex];

    }

    // Wait to loading introduction at home.
    waitToLoading(time) {
        browser.waitForExist(loading, time, true);
    }
}

module.exports = new ComponentAction();
