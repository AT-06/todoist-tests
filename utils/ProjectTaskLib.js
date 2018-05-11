function returnElementCSS(elementCSS, time) {
    browser.pause(5000);
    browser.waitForVisible(elementCSS, time);
    return browser.element(elementCSS);
}

module.exports = {returnElementCSS: returnElementCSS};