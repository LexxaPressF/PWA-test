/// <reference types="cypress" />
context('Graphic Component', () => {
    it('Graphic loaded', () => {
        cy.visit('/');

        cy.contains('Графика').click();
        cy.screenshot();
        cy.url().should('include', 'graphic');
        cy.screenshot();

        cy.get('svg').should('exist');
    });

    it('Rotate on low speed', () => {
        cy.visit('/');

        cy.contains('Графика').click();
        cy.screenshot();
        cy.url().should('include', 'graphic');
        cy.screenshot();

        cy.contains('Запустить анимацию').click();
        cy.wait(1000 * 60);
    });

    it('Rotate on medium speed', () => {
        cy.visit('/');

        cy.contains('Графика').click();
        cy.url().should('include', 'graphic');

        cy.get('input[type=range]')
            .as('slider')
            .invoke('val', 25)
            .trigger('input')
            .trigger('change');

        cy.get('@slider').should('have.value', 25);

        cy.contains('Запустить анимацию').click();
        cy.wait(1000 * 60);
    });
    it('Rotate on high speed', () => {
        cy.visit('/');

        cy.contains('Графика').click();
        cy.screenshot();

        cy.url().should('include', 'graphic');
        cy.screenshot();

        cy.get('input[type=range]')
            .as('slider')
            .invoke('val', 65)
            .trigger('input')
            .trigger('change');

        cy.get('@slider').should('have.value', 65);
        cy.screenshot();

        cy.contains('Запустить анимацию').click();
        cy.wait(1000 * 60);
    });
});
