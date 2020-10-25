Feature: Cart

    As a user
    I want to track items in cart

    Background: Navigate to landing page
        Given user is on Automation Practice landing page
        And cart is empty
        And user searches for "black dress"

    Scenario: Add dresses to cart
        When user adds first "2" items to cart
        And user proceeds to checkout from search page
        Then "2" dresses are in cart

    Scenario: Change quantity of second dress in cart to 2
        When user adds first "2" items to cart
        And user proceeds to checkout from search page
        And user changes quantity of the "2" nd dress to "2"
        Then quantity for "1" st dress is "1"
        And quantity for "2" nd dress is "2"

    Scenario: Remove first dress from cart
        When user adds first "2" items to cart
        And user proceeds to checkout from search page
        And user changes quantity of the "2" nd dress to "2"
        And user removes "1" st dress from cart
        Then "1" st dress is no longer in cart
        And "2" nd dress is still in cart

    Scenario: Checkout from cart as guest
        When user adds first "2" items to cart
        And user proceeds to checkout from search page
        And user changes quantity of the "2" nd dress to "2"
        And user removes "1" st dress from cart
        And user proceeds to checkout from cart page
        Then user should see the login screen