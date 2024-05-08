describe("Some Test", () => {
  it("Try login", () => {
    cy.visit("/login");
    const TEST_UID = Cypress.env("CYPRESS_TEST_UID");
    cy.login(TEST_UID);
    cy.wait(10000);
    // click button log in with google
    cy.get("button").contains("Log in with Google").click();
    cy.wait(5000);
    cy.visit("/profile");
    cy.get("button").contains("Log out").click();
    cy.logout();
  });
});
