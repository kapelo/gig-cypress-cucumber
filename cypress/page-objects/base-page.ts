export default class BasePage {

    //baseUrl       = "https://www.entrycentral.com";
    
    navigate(path: string): void {
        cy.visit(path);
    }

    validatePageTitle(pageTitle: string): void {
        cy.title().should('eq', pageTitle);
    }

    getPageTitle() {
        return cy.title();
    }
}