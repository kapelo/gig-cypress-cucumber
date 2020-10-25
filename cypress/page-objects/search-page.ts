import BasePage from "./base-page";
import CartPage from "./cart-page";

export default class SearchPage extends BasePage {

    constructor() {
        super();
    }

    productListsLocator = ".product_list";
    addedToCartSuccessMessageLocator = ".layer_cart_product";
    productNameLocator = "#layer_cart_product_title";
    productQuantityLocator = "#layer_cart_product_quantity";
    noOfItemsInCartTextMessage1Locator = ".ajax_cart_product_txt";
    noOfItemsInCartTextMessage2Locator =  ".ajax_cart_product_txt_s.unvisible";
    productCostLocator = "#layer_cart_product_price";
    closeDialogLocator = ".cross";
    proceedToCheckoutSearchLocator = "[title=\"Proceed to checkout\"]";
    allItemsInCartLocator = ".button.ajax_add_to_cart_button";
    cartItemsCount = ".ajax_cart_quantity.unvisible";

    addItemsToCart(numberOfItems: number): void {
        for (let index = 0; index < numberOfItems; index++) {
            //Add item to cart
            this.addItemToCart(index);

            //validate text = Product successfully added to your shopping cart - trim it
            cy.get(this.addedToCartSuccessMessageLocator).children().eq(1).invoke('text').then(actualText => {
                expect(actualText.trim()).equal('Product successfully added to your shopping cart');
            });

            //validate quantity
            cy.wait(2000);
            cy.get(this.cartItemsCount).invoke('text').then(noOfItemsInCart => {
                expect(parseInt(noOfItemsInCart)).to.eq(index + 1);
            });

            //validate text = There is 1/2 item(s) in your cart.
            if(index == 0) {
                cy.get(this.noOfItemsInCartTextMessage1Locator).eq(1).invoke('text').then(actualText => {
                    expect(actualText.trim()).equal('There is 1 item in your cart.');
                });
            } else if(index == 1) {
                cy.wait(3000);
                cy.get(this.noOfItemsInCartTextMessage2Locator).eq(1).invoke('text').then(actualText => {
                    expect(actualText.trim()).equal('There are 2 items in your cart.');
                });
            }

            if(index == 0)  {
                cy.clickElement(this.closeDialogLocator);
            }
        }
    }

    proceedToCheckout(): CartPage {
        cy.clickElement(this.proceedToCheckoutSearchLocator);

        return new CartPage();
    }

    addItemToCart(elementIndex: number): void {
        cy.get(this.productListsLocator).children().eq(elementIndex).then(element => {
            element.trigger('mouseover');
            cy.get(this.productListsLocator).children().eq(elementIndex).contains("Add to cart").click();

            //Save product name as alias
            cy.get(this.productListsLocator).children().find('.product-name').eq(elementIndex).invoke('text').as('productName' + elementIndex);

            //Save product cost as alias
            // JQuery -> $('.product_list').children().find('.price.product-price').eq(1).text()
            cy.get(this.productListsLocator).children().find('.price.product-price').eq(elementIndex + 1).invoke('text').as('productPrice' + elementIndex);
        });
    }
}
