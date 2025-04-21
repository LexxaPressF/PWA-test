/// <reference types="cypress" />

context('List Components', () => {
    it('Generate List and sort', () => {
        cy.visit('/');
        cy.screenshot();

        cy.contains('Большой список').click();
        cy.screenshot();

        cy.url().should('include', 'list');

        for (let i = 0; i <= 100; i++) {
            cy.contains('Сгенерировать список').click();
            cy.scrollTo('bottom');
            cy.scrollTo('top');
            cy.contains('Отсортировать список по random').click();
        }
    });

    it('Deleting', () => {
        cy.visit('/');
        cy.contains('Большой список').click();
        cy.url().should('include', 'list');

        cy.contains('Сгенерировать список').click();

        const randomSet = new Set();

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 100; j++) {
                let num = Math.floor(Math.random() * 1000);
                while (randomSet.has(num)) {
                    num = Math.floor(Math.random() * 1000);
                }
                cy.get(`.delete-${num}`).click();
                randomSet.add(num);
            }
            cy.contains('Сгенерировать список').click();
        }
    });
});
