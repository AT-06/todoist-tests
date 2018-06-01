let componentAction = require('../utils/ComponentAction');
let currentUserLogin = null;

class LoginPage {

    constructor() {
        this.loginEmail = '#email';
        this.loginPassword = '#password';
        this.loginSubmit = '#login_form';
        this.userOptions = 'gear_holder';
        this.logout = 'td[data-track="navigation|logout"]';
    }

    // Opening login page.
    open() {
        browser.url('/Users/showLogin');
    }

    // Logging on www.todosit.com website.
    login(email, password) {
        if (email !== currentUserLogin) {
            if (currentUserLogin === null) {
                this.open();
            }
            else { // going to ogOutl
                logOut();
            }
            componentAction.setElementValue(this.loginEmail, email);
            componentAction.setElementValue(this.loginPassword, password);
            componentAction.clickElement(this.loginSubmit);
            currentUserLogin = email;
        }


        browser.pause(500000000);
    }

    //Log out current user and go again to log in page.
    logOut() {
        componentAction.clickElement(this.userOptions);
        componentAction.clickElement(this.logout);
        browser.url('/Users/showLogin');
    }
}

module.exports = new LoginPage();
