describe("Login", function () {
  it("should be able to login", function () {
    cy.visit("/login");

    // Check if "Log in with Google" button is visible
    cy.get("button").contains("Log in with Google").should("be.visible");

    // Click on "Log in with Google" button
    cy.get("button").contains("Log in with Google").click();

    cy.origin("https://accounts.google.com", () => {
      // Ignore uncaught:exception
      cy.on("uncaught:exception", (err, runnable) => {
        console.error("Google Login -> uncaught:exception", err);
        // Skip test from https://github.com/cypress-io/cypress-example-recipes/tree/master/examples/fundamentals__errors
        return false;
      });

      // Type Email
      cy.url()
        .should("contain", "accounts.google.com")
        .get('input[type="email"]')
        .type(Cypress.env("CYPRESS_TEST_EMAIL"))
        .type("{enter}")
        .wait(3000);

      // Type Password
      cy.url()
        .should("contain", "accounts.google.com")
        .get('input[type="password"]')
        .type(Cypress.env("CYPRESS_TEST_PASSWORD"))
        .type("{enter}");
    });
  });
});
