describe("Some Test", () => {
  it("Try login", () => {
    cy.visit("/login");
    const TEST_UID =
      Cypress.env("NEXT_PUBLIC_CI_ENV") === "true"
        ? Cypress.env("CYPRESS_CI_TEST_UID")
        : Cypress.env("CYPRESS_TEST_UID");

    cy.login(TEST_UID);
    cy.wait(20000);
    cy.location("pathname").should("eq", "/");
  });
});
