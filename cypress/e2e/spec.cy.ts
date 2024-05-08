if (Cypress.env("googleClientId")) {
  describe("Google", function () {
    beforeEach(function () {
      cy.visit("/");
      cy.login(Cypress.env("CYPRESS_TEST_UID"));
      cy.wait(10000);
    });

    it("should allow a visitor to login, onboard and logout", function () {
      // cy.contains("Get Started").should("be.visible");
      cy.visit("/profile");
      // cy.wait("@createBankAccount");

      // Logout User

      // cy.location("pathname").should("eq", "/");
    });

    // it("shows onboarding", function () {
    //   cy.contains("Get Started").should("be.visible");
    // });
  });
}
