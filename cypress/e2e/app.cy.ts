describe("Some Test", () => {
  beforeEach(() => {
    if (!Cypress.env("NEXT_PUBLIC_CI_ENV")) {
      cy.visit("/login");
      const TEST_UID = Cypress.env("CYPRESS_TEST_UID");
      cy.login(TEST_UID);
    }
  });
  it("Should be able to login and redirect to home page", () => {
    cy.visit("/");
    // check pathname is "/"
    cy.location("pathname").should("eq", "/");
    // check if user is logged in
    cy.contains("You are logged in").should("be.visible");
    // click button to go to profile
    cy.get("a").contains("Go to profile page").click();
    // check pathname is "/profile"
    cy.location("pathname").should("eq", "/profile");
    // check if user is logged in
    cy.contains("You are logged in").should("be.visible");
    // click button to logout
    cy.get("button").contains("Logout").click();
  });
});
