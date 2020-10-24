export default class BasePage {

    //baseUrl       = "https://www.entrycentral.com";
    
    navigate(path: string) {
        cy.visit(path);
    }

    validatePageTitle(pageTitle: string) {
        cy.title().should('eq', pageTitle);
    }

    getPageTitle() {
        return cy.title();
    }
}