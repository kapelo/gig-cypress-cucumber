import { extend } from "cypress/types/lodash";
import BasePage from "./base-page";
import LoginPage from "./login-page";

export default class AccountPage extends BasePage {

    constructor() {
        super();
    }

    accountNameNavLinkLocator = ".account";
    signOutNavLinkLocator = ".logout";
    personalInfoLinkText = ".icon-user";
    emailFieldLocator = "#email";

    validateUserFirstAndLastName() {
        const expectedFirstLastName = Cypress.env('firstLastName');

        cy.get(this.accountNameNavLinkLocator).invoke('text').then((actualFirstAndLastName) => {
            expect(actualFirstAndLastName).equal(expectedFirstLastName);
        });
    }

    validateUserEmail() {
        const expectedEmail = Cypress.env('validemail');

        cy.clickElement(this.personalInfoLinkText);

        cy.get(this.emailFieldLocator).invoke('val').then((actualEmail) => {
            expect(actualEmail).equal(expectedEmail);
        });
    }

    validateSignOutNavLinkText() {
        const expectedSignOutNavLinkText = 'Sign out';

        cy.get(this.signOutNavLinkLocator).invoke('text').then((actualSignOutNavLinkText) => {
            expect(actualSignOutNavLinkText.trim()).equal(expectedSignOutNavLinkText);
        });
    }

    logout() {
        cy.clickElement(this.signOutNavLinkLocator);

        return new LoginPage();
    }

    getUserFirstAndLastNameLocator() {
        return cy.get(this.accountNameNavLinkLocator);
    }

    getSignOutNavLinkLocator() {
        return cy.get(this.signOutNavLinkLocator);
    }
}