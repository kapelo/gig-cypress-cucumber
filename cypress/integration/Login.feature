Feature: Login

    As a user
    I want to log into Automation Practice
    So that I can shop for wears

    Scenario: User is not logged in
        Given user opens Automation Practice landing page
        When user accesses "/index.php?controller=order" page
        Then user should not be signed in

    Scenario: User does not enter email and password
        Given user opens Automation Practice landing page
        And user clicks on Sign In nav link
        When user clicks on Sign in button
        Then user should see "An email address required."
        And user should not be signed in

    Scenario: User enters less than 5 characters as password
        Given user opens Automation Practice landing page
        And user clicks on Sign In nav link
        When user enters email and password
        And user clicks on Sign in button
        Then user should see "Invalid password."
        And user should not be signed in
 
    Scenario: User enters wrong password
        Given user opens Automation Practice landing page
        And user clicks on Sign In nav link
        When user enters email and password
        And user clicks on Sign in button
        Then user should see "Authentication failed."
        And user should not be signed in

    Scenario: Registered user logs in
        Given user opens Automation Practice landing page
        And user clicks on Sign In nav link
        When user enters email and password
        And user clicks on Sign in button
        Then user should be signed in

    Scenario: User is logged out
        Given user is logged in
        And user clicks on Sign out nav link
        Then user should not be signed in