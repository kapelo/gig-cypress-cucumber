import { extend } from "cypress/types/lodash";
import BasePage from "./base-page";
import LoginPage from "./login-page";

export default class LandingPage extends BasePage {

    constructor() {
        super();
    }

    signInNavLinkLocator = ".login";

    navigate() {
        cy.visit('/');
    }

    navigateTo(link: string) {
        cy.visit('/' + link);
    }

    navigateToLoginPage() {
        cy.clickElement(this.signInNavLinkLocator);

        return new LoginPage();
    }

    //clickSignInNavLink() {
        //cy.get('.login').contains('Sign in').should('be.visible').click();

        //cy.clickElement(this.signInNavLinkLocator);
    //}

    getSignInText() {
        cy.get('.login').invoke('text').then((text) => {
            return text.trim();
        })
    }
}