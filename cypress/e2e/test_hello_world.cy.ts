describe("Some Test", () => {
  it("Try login", () => {
    if (Cypress.env("CYPRESS_TEST_UID") === undefined) {
      cy.visit("/login");
      const TEST_UID = Cypress.env("CYPRESS_TEST_UID");
      cy.login(TEST_UID);
    }

    cy.visit("/");
    cy.location("pathname").should("eq", "/");
    cy.logout();
  });
});
