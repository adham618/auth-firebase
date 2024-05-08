describe("Some Test", () => {
  it("Try login", () => {
    cy.visit("/login");

    cy.login(Cypress.env("CYPRESS_TEST_UID"));
    cy.visit("/");
    cy.location("pathname").should("eq", "/");
  });
});
