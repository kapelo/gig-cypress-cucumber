import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';

import AccountPage from '../page-objects/account-page';
import LandingPage from '../page-objects/landing-page';
import LoginPage from '../page-objects/login-page';

let landingPage = new LandingPage();
let loginPage = new LoginPage();
let accountPage = new AccountPage();
const loginPageTitle = 'Login - My Store';

Given('user is on Automation Practice landing page', () => {
  landingPage.navigate();
  landingPage.validatePageTitle('My Store');
});

Given('user navigates to login page', () => {
  loginPage = landingPage.navigateToLoginPage();
  loginPage.validatePageTitle(loginPageTitle);
});

When('user logs in with {string} credential', (credType) => {
  loginPage.login(credType);
});

When('user logs in with a/an {string} credential', (credType) => {
  loginPage.login(credType);
});

Then('user should be signed in', () => {
  accountPage.validatePageTitle('My account - My Store');
  accountPage.validateUserFirstAndLastName();
  accountPage.validateSignOutNavLinkText();
  accountPage.validateUserEmail();
});

And('user logs out', (credType) => {
  loginPage = accountPage.logout();
});

Then('user should be signed out', () => {
  loginPage.validatePageTitle(loginPageTitle);
  loginPage.validateUserFirstAndLastNameDoesNotShow();
  loginPage.validateSignOutNavLinkDoesNotShow();
});

Given('user clicks on Sign out nav link', () => {
  //cy.get('.logout').contains('Sign out').should('be.visible').click();
  loginPage = accountPage.logout();
  loginPage.validatePageTitle(loginPageTitle);
});

Then('user should see {string} error message', (expectedAlertMessage: string) => {
  loginPage.validateAlertMessage(expectedAlertMessage);
});









//When('user clicks on Sign in button', () => {
  //cy.get('#SubmitLogin').contains('Sign in').should('be.visible').click()
  //loginPage.clickSignInButton();
  //let tempPageTitle = cy.title();

  //tempPageTitle.then((text) => {
    //if(text == 'My account - My Store') {
      //accountPage = new AccountPage();
      //accountPage.validatePageTitle('My account - My Store');
    //}
  //});
  
  //accountPage = loginPage.clickSignInButton();
  //accountPage.validatePageTitle('My account - My Store');
//});

//When('user enters', (datatable) => {
  //datatable.hashes().forEach((element: { email: string; password: string; }) => {
    //cy.get('#email').type(element.email)
    //cy.get('#passwd').type(element.password)
    //loginPage.enterEmail(element.email);
    //loginPage.enterPassword(element.password);
  //});
//});

//Then('user should not be signed in', () => {
  //cy.get('.login').invoke('text').then((text) => {
    //expect(text.trim()).equal('Sign in')
  //})
  //const signInText = loginPage.getSignInText();
  //expect(signInText).equal('Sign in');
//});

//Then('user should be signed in', () => {
//  accountPage.validatePageTitle('My account - My Store');
//  accountPage.validateUserFirstAndLastName('Aniekan Eshiet');
//  accountPage.validateSignOutNavLinkText('Sign out');
//});
