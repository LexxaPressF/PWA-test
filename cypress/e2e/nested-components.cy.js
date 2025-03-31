/// <reference types="cypress" />

context('Nested Components', () => {
    it('Changing status, then deleting', () => {
        cy.visit('https://127.0.0.1');

        cy.contains('Вложенные данные').click();
        cy.url().should('include', 'nested');

        for (let i = 0; i < 20; i++) {
            cy.get(`button.status-down-${i}`).click();

            cy.get(`button.status-up-${20 - i}`).click();
        }

        for (let i = 1; i <= 20; i++) {
            cy.get(`button.delete-${i}`).click();
        }
    });
});
