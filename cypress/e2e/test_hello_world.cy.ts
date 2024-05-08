describe("Some Test", () => {
  it("Try login", () => {
    if (Cypress.env("NEXT_PUBLIC_CI_ENV") === undefined) {
      cy.visit("/login");
      const TEST_UID = Cypress.env("CYPRESS_TEST_UID");
      cy.login(TEST_UID);
    }

    cy.visit("/");
    // cy.location("pathname").should("eq", "/");
    if (Cypress.env("NEXT_PUBLIC_CI_ENV") !== undefined) {
      cy.logout();
    }
  });
});
