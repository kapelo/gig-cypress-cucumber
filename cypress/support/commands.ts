// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

declare namespace Cypress {
    interface Chainable<Subject> {
        enterText(locator: any, text: string): Cypress.Chainable<void>;
        clickElement(locator: any): Cypress.Chainable<void>;
    }
}
  
function enterText(locator: any, text: string): void {
    let element = cy.get(locator);
    element.clear();
    element.type(text);
}

Cypress.Commands.add("enterText", enterText);

function clickElement(locator: any): void {
    let element = cy.get(locator);
    element.click();
}

Cypress.Commands.add("clickElement", clickElement);