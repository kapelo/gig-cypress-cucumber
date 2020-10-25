import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

import LoginPage from '../page-objects/login-page';
import LandingPage from '../page-objects/landing-page';
import CartPage from '../page-objects/cart-page';
import SearchPage from '../page-objects/search-page';

let landingPage = new LandingPage();
let searchPage = new SearchPage();
let cartPage = new CartPage();
let loginPage = new LoginPage();

Given('user is on Automation Practice landing page', () => {
    landingPage.navigate();
    landingPage.validatePageTitle('My Store');
});

Given('cart is empty', () => {
  landingPage.validateCartIsEmpty();
});

Given('user searches for {string}', (searchTerm: string) => {
  searchPage = landingPage.search(searchTerm);
});

When('user adds first {string} items to cart', (numberOfItemsToAdd: string) => {
  searchPage.addItemsToCart(parseInt(numberOfItemsToAdd));
});

When('user proceeds to checkout from search page', () => {
  cartPage = searchPage.proceedToCheckout();
  cartPage.validatePageTitle('Order - My Store');
  cartPage.validateHeaderTextIsDisplayed();
});

Then('{string} dresses are in cart', (noOfItems: string) => {
  cartPage.validateNumberOfItemsInCart(parseInt(noOfItems));
  cartPage.validateItemsInCart(parseInt(noOfItems));
});

When('user changes quantity of the {string} nd dress to {string}', (itemIndex: string, quantity: string) => {
  cartPage.increaseItemQuantity(parseInt(itemIndex) -  1, quantity);
});

Then('quantity for {string} st/nd dress is {string}', (itemIndex: string, quantity: string) => {
  cartPage.validateQuantityOfItemInCart(parseInt(itemIndex) - 1, quantity);
});

Then('{string} nd dress is still in cart', (itemIndex: string, quantity: string) => {
  cartPage.validateProductIsInCart(parseInt(itemIndex) - 1);
});

When('user removes {string} st dress from cart', (itemIndex: string) => {
  cartPage.deleteItem(parseInt(itemIndex) - 1);
});

Then('{string} st dress is no longer in cart', (itemIndex: string) => {
  cartPage.validateItemIsDeleted(parseInt(itemIndex) - 1);
});

When('user proceeds to checkout from cart page', () => {
  loginPage = cartPage.proceedToCheckout();
  loginPage.validatePageTitle('Login - My Store');
});

Then('user should see the login screen', () => {
  loginPage.validateHeaderTextIsDisplayed();
});
