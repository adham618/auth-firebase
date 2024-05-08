describe("Some Test", () => {
  it("Try login", () => {
    if (Cypress.env("NEXT_PUBLIC_CI_ENV") !== "true") {
      cy.visit("/login");
      const TEST_UID = Cypress.env("CYPRESS_TEST_UID");
      cy.login(TEST_UID);
    }
    cy.callFirestore("add", "test_hello_world", { some: "value" });

    cy.visit("/");
    cy.location("pathname").should("eq", "/");
    if (Cypress.env("NEXT_PUBLIC_CI_ENV") !== "true") {
      cy.logout();
    }
  });
});
