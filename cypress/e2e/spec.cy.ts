describe("Login", function () {
  it("should successfully login using Google authentication", function () {
    // Visit the login page
    cy.visit("/login");

    // Verify if the "Log in with Google" button is visible
    cy.get("button")
      .contains("Log in with Google")
      .should("be.visible")
      .click();

    // Handle Google authentication
    cy.origin("https://accounts.google.com", () => {
      // Handle uncaught exceptions gracefully
      cy.on("uncaught:exception", (err, runnable) => {
        console.error("Google Login -> uncaught:exception", err);
        // Ignore error and continue test execution
        return false;
      });

      // Enter email
      cy.url()
        .should("contain", "accounts.google.com")
        .get('input[type="email"]')
        .type(Cypress.env("CYPRESS_TEST_EMAIL"))
        .type("{enter}")
        .wait(3000);

      // Enter password
      cy.url()
        .should("contain", "accounts.google.com")
        .get('input[type="password"]')
        .type(Cypress.env("CYPRESS_TEST_PASSWORD"))
        .type("{enter}");
    });

    // Verify successful login by checking URL redirection
    cy.url().should("not.contain", "accounts.google.com");

    // Wait for the page to fully redirect
    cy.wait(10000); // Adjust timing as necessary

    // Visit the profile page
    cy.visit("/profile");

    // Log out
    cy.get("button").contains("Log out").click();

    // Reload the page
    cy.reload();

    // Verify redirection back to the login page after logout
    cy.url().should("contain", "login");
  });
});
