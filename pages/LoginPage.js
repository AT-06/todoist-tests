let Page = require('./Page');
let componentAction = require('../utils/ComponentAction');
let loginEmail = '#email';
let loginPassword = '#password';
let loginSubmit = '#login_form';
let timeToWait = 30000;
let currentUserLogin = null;

class LoginPage extends Page {

    // Opening login page.
    open() {
        super.open('/Users/showLogin');
    }

    // Logging on www.todosit.com website.
    login(email, password) {
        if(email !== currentUserLogin ){
        this.open();
        componentAction.setValueElement(loginEmail, email, timeToWait);
        componentAction.setValueElement(loginPassword, password, timeToWait);
        componentAction.clickElement(loginSubmit, timeToWait);
        currentUserLogin = email;
        }

    }
}

module.exports = new LoginPage();
