describe("App", function () {
  it("should login and go to profile page to logout", function () {
    // login
    cy.login();

    // Visit the login page
    cy.visit("/profile");

    // Log out
    cy.get("button").contains("Log out").click();

    // Reload the page
    cy.reload();

    // Verify redirection back to the login page after logout
    cy.url().should("contain", "login");
  });
});
