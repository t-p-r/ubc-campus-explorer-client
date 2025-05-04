describe('My First Test', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080); // most pp use this
        cy.visit('/');
    });

    it('check elements exist', () => {
        cy.get('.css-axw7ok > img'); // ubc logo
        cy.get('.css-axw7ok > .MuiTypography-root > strong').contains(/^UBC Campus Explorer$/i); // title
        cy.get('.leaflet-container'); // map

        cy.get('.css-0 > .MuiButtonBase-root'); // github icon
        cy.get('.css-0 > .MuiButtonBase-root'); // search bar
        cy.get('.css-11zeeso > .MuiButtonBase-root'); // order button
        cy.get('.css-13nua9 > :nth-child(1)'); // first page
        cy.get('.css-13nua9 > :nth-child(2)'); // -1 page
        cy.get('.css-13nua9 > :nth-child(4)'); // +1 page
        cy.get('.css-13nua9 > :nth-child(5)'); // last page

        cy.get('.css-13nua9 > .MuiBox-root > .MuiTypography-root').then((text) => {
            expect(text.text()).to.match(/^\d+ - \d+ of \d+$/); // check if the text is in the format of "1 - 0 of 0"
            if((text.text()).includes('of 0') === false) { // has rooms
                cy.get('.css-13nua9 > .MuiBox-root > .MuiTypography-root'); // room box
            }
        });
    });

    it('check impossible building name', () => {
        /* ==== Generated with Cypress Studio ==== */
        cy.get('#\\:r1\\:').clear();
        cy.get('#\\:r1\\:').type('no building have this name kek');
        /* ==== End Cypress Studio ==== */
        cy.get('.css-13nua9 > .MuiBox-root > .MuiTypography-root').contains('1 - 0 of 0');
    });
});
export {};
