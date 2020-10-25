import BasePage from "./base-page";
import LoginPage from "./login-page";
import SearchPage from "./search-page";

export default class LandingPage extends BasePage {

    constructor() {
        super();
    }

    signInNavLinkLocator = ".login";
    searchFieldLocator  =  "#search_query_top";
    searchButtonLocator = ".btn.button-search";
    cartItemsCount = ".ajax_cart_quantity.unvisible";

    navigate(): void {
        cy.visit('/');
    }

    navigateTo(link: string): void {
        cy.visit('/' + link);
    }

    navigateToLoginPage(): LoginPage {
        cy.clickElement(this.signInNavLinkLocator);

        return new LoginPage();
    }

    getSignInText(): void {
        cy.get('.login').invoke('text').then((text) => {
            return text.trim();
        });
    }

    search(searchTerm: any): SearchPage {
        cy.enterText(this.searchFieldLocator, searchTerm);
        cy.clickElement(this.searchButtonLocator);

        return new SearchPage();
    }


    validateCartIsEmpty(): void {
        cy.get(this.cartItemsCount).invoke('text').then(noOfItemsInCart => {
            expect(parseInt(noOfItemsInCart)).to.eq(0);
        });
    }
}