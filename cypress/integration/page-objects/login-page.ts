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

    login(credType: string) {
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

    validateAlertMessage(expectedAlertMessage: string) {
        cy.get(this.alertMessageLabelocator).children().eq(1).invoke('text').then((actualAlertError) => {
            expect(actualAlertError.trim()).equal(expectedAlertMessage);
        });
    }

    validateUserFirstAndLastNameDoesNotShow() {
        const accountPage = new AccountPage();

        accountPage.getUserFirstAndLastNameLocator().should('not.exist');
    }

    validateSignOutNavLinkDoesNotShow() {
        const accountPage = new AccountPage();

        accountPage.getSignOutNavLinkLocator().should('not.exist');
    }
}