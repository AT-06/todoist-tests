let Page = require('./Page');
let componentAction = require('../utils/ComponentAction');
let timeToWait = 30000;
class LoginPage extends Page {
    // Getting email element.
    get email() {
        let elementCSS = '#email';

        componentAction.getElement(elementCSS, timeToWait);
        return browser.element(elementCSS);
    }

    // Getting password element.
    get password() {
        let elementCSS = '#password';
        componentAction.getElement(elementCSS, timeToWait);
        return browser.element(elementCSS);
    }

    // Getting submit button element.
    get submit() {
        let elementCSS = '#login_form';
        componentAction.getElement(elementCSS, timeToWait);
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
}

module.exports = new LoginPage();
