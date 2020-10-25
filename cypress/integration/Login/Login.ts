import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';

import AccountPage from '../page-objects/account-page';
import LandingPage from '../page-objects/landing-page';
import LoginPage from '../page-objects/login-page';

let accountPage = new AccountPage();
let landingPage = new LandingPage();
let loginPage = new LoginPage();

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
  loginPage.validateHeaderTextIsDisplayed();
  loginPage.validateUserFirstAndLastNameDoesNotShow();
  loginPage.validateSignOutNavLinkDoesNotShow();
});

Then('user should see {string} error message', (expectedAlertMessage: string) => {
  loginPage.validateAlertMessage(expectedAlertMessage);
});