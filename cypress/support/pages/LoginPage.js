export class LoginPage{
    static navigateToLoginPage(){
        cy.visit("https://www.saucedemo.com/");
    }

    static enterUserName(username){
        cy.get('#user-name').type(username)
    }

    static enterPwd(pwd){
        cy.get('#password').type(pwd)
    }

    static clickLoginBtn(){
        cy.get('#login-button').click()
    }

    static verifyLoginSuccessful(){
        cy.contains('Swag Labs').should('be.visible')
    }

    static login(username, pwd) {
        this.navigateToLoginPage();
        this.enterUserName(username);
        this.enterPwd(pwd);
        this.clickLoginBtn();
    }
}