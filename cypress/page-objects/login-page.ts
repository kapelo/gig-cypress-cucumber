import AccountPage from "./account-page";
import BasePage from "./base-page";

export default class LoginPage extends BasePage {
    
    constructor() {
        super();
    }

    emailFieldLocator = "#email";
    passwordFieldLocator = "#passwd";
    alertMessageLabelocator = ".alert.alert-danger";
    signInButtonLocator = "#SubmitLogin";
    signInNavLinkLocator = ".login";
    loginHeaderLocator  = "#center_column";

    login(credType: string): void {
        const userEmail = Cypress.env(credType + 'email');
        const userPassword = Cypress.env(credType + 'password');

        if(userEmail != "") {
            cy.enterText(this.emailFieldLocator, userEmail);
        }

        if(userPassword != "") {
            cy.enterText(this.passwordFieldLocator, userPassword);
        }
        
        cy.clickElement(this.signInButtonLocator);
    }

    validateAlertMessage(expectedAlertMessage: string): void {
        cy.get(this.alertMessageLabelocator).children().eq(1).invoke('text').then((actualAlertError) => {
            expect(actualAlertError.trim()).equal(expectedAlertMessage);
        });
    }

    validateUserFirstAndLastNameDoesNotShow(): void {
        const accountPage = new AccountPage();

        accountPage.getUserFirstAndLastNameLocator().should('not.exist');
    }

    validateSignOutNavLinkDoesNotShow(): void {
        const accountPage = new AccountPage();

        accountPage.getSignOutNavLinkLocator().should('not.exist');
    }

    validateHeaderTextIsDisplayed(): void {
        cy.get(this.loginHeaderLocator).contains('Authentication').should('be.visible');
    }
}