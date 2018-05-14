let Page = require('./Page');
let componentAction = require('../utils/ComponentAction');
let loginEmail = '#email';
let loginPassword = '#password';
let loginSubmit = '#login_form';
let userOptions = 'gear_holder';
let logout = 'td[data-track="navigation|logout"]';
let timeToWait = 30000;
let currentUserLogin = null;

class LoginPage extends Page {

    // Opening login page.
    open() {
        super.open('/Users/showLogin');
    }

    // Logging on www.todosit.com website.
    login(email, password) {
        if (email !== currentUserLogin) {
            if (currentUserLogin === null) {
                this.open();
            }
            else { // going to logout
                componentAction.clickElement(userOptions, timeToWait);
                componentAction.clickElement(logout, timeToWait);
                browser.url('/Users/showLogin');
            }
            componentAction.setValueElement(loginEmail, email, timeToWait);
            componentAction.setValueElement(loginPassword, password, timeToWait);
            componentAction.clickElement(loginSubmit, timeToWait);
            currentUserLogin = email;
        }

    }
}

module.exports = new LoginPage();
