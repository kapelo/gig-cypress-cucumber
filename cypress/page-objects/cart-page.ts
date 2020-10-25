import { callbackify } from "util";
import BasePage from "./base-page";
import LoginPage from "./login-page";

export default class CartPage extends BasePage {

    constructor() {
        super();
    }

    cartTitleLocator = "#cart_title";
    allCartItemsLocator = "tbody>tr";
    quantityInputFieldLocator = ".cart_quantity_input";
    deleteIconLocator = ".icon-trash";
    proceedToCheckoutCartLocator = ".button.btn.btn-default.standard-checkout.button-medium";

    validateHeaderTextIsDisplayed(): void {
        cy.get(this.cartTitleLocator).contains('Shopping-cart summary').should('be.visible');
    }

    validateItemsInCart(expectedNoOfItems: number): void {
        for (let index = 0; index < expectedNoOfItems; index++) {
            this.validateProductNameInCart(index);
            this.validateProductCostInCart(index);
        }
    }

    validateProductNameInCart(elementIndex: number): void {
        this.getAllCartItems().children().find('.product-name').eq(elementIndex).invoke('text').then(actualProductName => {
            cy.get<string>("@productName" + elementIndex).then(expectedProductName => {
                expect(expectedProductName.trim()).equal(actualProductName);
            });
        });
    }

    validateProductCostInCart(elementIndex: number): void {
        cy.get('[data-title=\"Total\"]').eq(elementIndex).invoke('text').then(actualProductPrice => {
            cy.get<string>("@productPrice" + elementIndex).then(expectedProductPrice => {
                expect(expectedProductPrice.trim()).equal(actualProductPrice.trim());
            });
        });
    }

    validateNumberOfItemsInCart(expectedNumberOfItems: number): void {
        this.getAllCartItems().should('have.length', expectedNumberOfItems);
    }

    increaseItemQuantity(itemIndex: number, quantity: string): void {
        this.getQuantityFieldElement(itemIndex).invoke('val').then(oldProductQuantity =>  {

            this.getQuantityFieldElement(itemIndex).clear().type(quantity);

            cy.wait(3000);
            cy.reload();

            this.getQuantityFieldElement(itemIndex).invoke('val').then(newProductQuantity =>  {
                expect(oldProductQuantity).not.to.eq(newProductQuantity);
            });
        });
    }

    validateQuantityOfItemInCart(itemIndex: number, quantity: string): void {
        this.getQuantityFieldElement(itemIndex).invoke('val').then(currentProductQuantity =>  {
            expect(currentProductQuantity).to.eq(quantity);
        });
    }

    deleteItem(elementIndex: number): void {
        cy.get(this.deleteIconLocator).eq(elementIndex).click();
    }

    validateItemIsDeleted(elementIndex: number): void {
        cy.wait(3000);

        cy.get<string>("@productName" + elementIndex).then(deletedProductName => {
            this.getAllCartItems().children().find('.product-name').then(elements => {
                
                for (let index = 0; index < elements.length; index++) {
                    //$('tbody>tr').children().find('.product-name').eq(1).text()
                    this.getAllCartItems().children().find('.product-name').eq(index).invoke('text').then(currentProductName => {
                        expect(currentProductName.trim()).not.to.eq(deletedProductName.trim());
                    });
                }
            });
        });
    }

    validateProductIsInCart(elementIndex: number): void {
        cy.get<string>("@productName" + elementIndex).then(expectedProductName => {
            this.getAllCartItems().children().find('.product-name').then(elements => {
                
                for (let index = 0; index < elements.length; index++) {
                    this.getAllCartItems().children().find('.product-name').eq(index).invoke('text').then(currentProductName => {
                        expect(currentProductName.trim()).to.eq(expectedProductName.trim());
                    });
                }
            });
        });
    }

    getAllCartItems() {
        return cy.get(this.allCartItemsLocator);
    }

    getQuantityFieldElement(index: number) {
        return cy.get(this.quantityInputFieldLocator).eq(index);
    }

    proceedToCheckout(): LoginPage {
        cy.clickElement(this.proceedToCheckoutCartLocator);

        return new LoginPage();
    }
}