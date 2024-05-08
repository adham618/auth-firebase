describe("Some Test", () => {
  it("Try login", () => {
    cy.visit("/login");
    const TEST_UID = Cypress.env("CYPRESS_TEST_UID");
    cy.login(TEST_UID);
    cy.wait(10000);
    cy.logout();
  });
});
