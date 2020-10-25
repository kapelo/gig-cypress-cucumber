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

    validateUserFirstAndLastName(): void {
        const expectedFirstLastName = Cypress.env('firstLastName');

        cy.get(this.accountNameNavLinkLocator).should('have.text', expectedFirstLastName);
    }

    validateUserEmail(): void {
        const expectedEmail = Cypress.env('validemail');

        cy.clickElement(this.personalInfoLinkText);

        cy.get(this.emailFieldLocator).should('have.value', expectedEmail);
    }

    validateSignOutNavLinkText(): void {
        const expectedSignOutNavLinkText = 'Sign out';

        cy.get(this.signOutNavLinkLocator).should('contain', expectedSignOutNavLinkText);
    }

    logout(): LoginPage {
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