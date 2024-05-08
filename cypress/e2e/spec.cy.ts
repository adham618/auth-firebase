describe("Google", function () {
  beforeEach(function () {
    cy.visit("/login");
    cy.login(Cypress.env("CYPRESS_TEST_UID"));
    cy.wait(4000);
  });

  it("should be able to visit home page", function () {
    cy.visit("/");
    cy.wait(4000);
    cy.location("pathname").should("eq", "/");
  });

  it("should be able to visit profile page and logout", function () {
    cy.wait(4000);
    cy.visit("/");
    cy.get("a").contains("Go to profile page").click();
    cy.location("pathname").should("eq", "/profile");
    cy.get("button").contains("Log out").click();
  });
});
