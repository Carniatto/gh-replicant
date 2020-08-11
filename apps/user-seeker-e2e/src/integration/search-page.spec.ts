import { getFooter, getHeader, getSearchBar, getSearchButton, getTitleH2 } from '../support/app.po';

describe('user-seeker', () => {
  beforeEach(() => cy.visit('/'));

  it('Should display a header', () => {
    getHeader().should('exist');
  });

  it('Should display a footer', () => {
    getFooter().should('exist');
  });

  it('Should display the search bar', () => {
    getTitleH2().contains('Search Users').should('exist');
    getSearchBar().should('exist');
    getSearchButton().should('exist');
  });
});
