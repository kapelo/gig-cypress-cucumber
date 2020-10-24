Feature: Login

    As a user
    I want to track items in cart

    Background: Navigate to landing page
        Given user is on Automation Practice landing page
        And user searches for "black dress"

    Scenario: Add dresses to cart
        When user adds first 2 items to cart
        And user proceeds to checkout from search page
        Then both dresses are in cart

    Scenario: Change quantity of second dress in cart to 2
        When user adds first 2 items to cart
        And user proceeds to checkout from search page
        And user changes quantity of the "second" dress to "2"
        Then quantity for "first" dress is "1"
        And quantity for "second" dress is "2"

    Scenario: Remove first dress from cart
        When user adds first 2 items to cart
        And user proceeds to checkout from search page
        And user changes quantity of the "second" dress to "2"
        And user removes "first" dress from cart
        Then "first" dress is no longer in cart
        And quantity for "second" dress is "2"

    Scenario: Checkout from cart as guest
        When user adds first 2 items to cart
        And user proceeds to checkout from cart page
        And user changes quantity of the "second" dress to "2"
        And user removes "first" dress from cart
        And user proceeds to checkout
        Then user should see the login screen