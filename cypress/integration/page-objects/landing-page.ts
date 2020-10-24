import BasePage from "./base-page";
import LoginPage from "./login-page";

export default class LandingPage extends BasePage {

    constructor() {
        super();
    }

    signInNavLinkLocator = ".login";
    searchFieldLocator  =  "#search_query_top";
    searchButtonLocator = "input[type = \"submit\"]";

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

    getSignInText() {
        cy.get('.login').invoke('text').then((text) => {
            return text.trim();
        })
    }

    search(searchTerm: any) {
        cy.enterText(this.searchFieldLocator, searchTerm);
        cy.clickElement(this.searchButtonLocator);
    }
}