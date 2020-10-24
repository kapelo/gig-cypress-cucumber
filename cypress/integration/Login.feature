Feature: Login

    As a user
    I want to log into Automation Practice
    So that I can shop for wears

    Background: Navigate to Automation Practice landing page
        Given user is on Automation Practice landing page
        And user navigates to login page

    Scenario: When user logs in with no credential
        When user logs in with "no" credential
        Then user should see "An email address required." error message

    Scenario: When user logs in with incorrect credential
        When user logs in with an "invalid" credential
        Then user should see "Authentication failed." error message

    Scenario: When user logs in with correct registered credential
        When user logs in with a "valid" credential
        Then user should be signed in

    Scenario: Log user out
        When user logs in with a "valid" credential
        And user logs out
        Then user should be signed out


#    Scenario: User enters less than 5 characters as password
#        And user clicks on Sign In nav link
#        When user enters
#            | email                    | password |
#            | aniekan.eshiet@gmail.com | pass     |
#        And user clicks on Sign in button
#        Then user should see "Invalid password."
#        And user should not be signed in

#    Scenario: User is logged out
#        And user clicks on Sign In nav link
#        When user enters
#            | email                    | password |
#            | aniekan.eshiet@gmail.com | globacom |
#        And user clicks on Sign in button
#        And user clicks on Sign out nav link
#        Then user should not be signed in