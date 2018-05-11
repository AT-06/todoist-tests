let Page = require('./Page');

class LoginPage extends Page {
    // Getting email element.
    get email() {
        let elementCSS = '#email';
        this.actionWaitTo(elementCSS, 0);
        return browser.element(elementCSS);
    }

    // Getting password element.
    get password() {
        let elementCSS = '#password';
        this.actionWaitTo(elementCSS, 0);
        return browser.element(elementCSS);
    }

    // Getting submit button element.
    get submit() {
        let elementCSS = '#login_form';
        this.actionWaitTo(elementCSS, 0);
        return browser.element(elementCSS);
    }

    // Opening login page.
    open() {
        super.open('/Users/showLogin');
    }

    // Logging on www.todosit.com website.
    login(email, password) {
        this.open();
        this.email.setValue(email);
        this.password.setValue(password);
        this.submit.click();
    }

    // This method is to wait a element.
    actionWaitTo(element, time) {
        browser.pause(time);
        browser.waitForVisible(element)
    }
}

module.exports = new LoginPage();
