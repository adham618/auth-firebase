describe("Some Test", () => {
  it("Try login", () => {
    cy.login(Cypress.env("CYPRESS_TEST_UID"));
  });
});
