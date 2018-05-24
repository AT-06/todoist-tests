let componentAction = require('../utils/ComponentAction');
let loginEmail = '#email';
let loginPassword = '#password';
let loginSubmit = '#login_form';
let userOptions = 'gear_holder';
let logout = 'td[data-track="navigation|logout"]';
let currentUserLogin = null;

class LoginPage {

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
            else { // going to logout
                logout();
            }

            componentAction.setValueElement(loginEmail, email);
            componentAction.setValueElement(loginPassword, password);
            componentAction.clickElement(loginSubmit);
            currentUserLogin = email;
        }
    }

    //Log out current user and go again to log in page.
    logout() {
        componentAction.clickElement(userOptions);
        componentAction.clickElement(logout);
        browser.url('/Users/showLogin');
    }
}

module.exports = new LoginPage();
