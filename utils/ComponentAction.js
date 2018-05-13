const loading = '#loading';
class ComponentAction {

    getElement(elementCSS, time) {
        browser.waitForVisible(elementCSS, time);
        return browser.element(elementCSS);
    }
    clickElement(elementCSS, time) {
        browser.waitForVisible(elementCSS, time);
        browser.element(elementCSS).click();
    }
    setValueElement(elementCSS,value, time) {
        browser.waitForVisible(elementCSS, time);
        browser.element(elementCSS).setValue(value);
    }
    lastElementOnList(elementCSS,time,difference){
        let lasElement = this.getElement(elementCSS,time);
        let lastProjectIndex = lasElement.elements('li').value.length- difference;
        return lasElement.elements('li').value[lastProjectIndex];

    }
    waitToLoading(time){
        browser.waitForExist(loading,time,true);
    }
}
module.exports = new ComponentAction();
