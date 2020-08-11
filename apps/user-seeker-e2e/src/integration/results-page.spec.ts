import { getPaginator, getResultCard, getSearchBar, getTitleH3 } from '../support/app.po';

describe('user-seeker results one page', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.server();
    cy.route('**/search/users?q=carniatto*', 'fixture:search-users-onepage');
    cy.route('**/users/*', 'fixture:user-detail');
  });

  it('Should navigate to results on search', () => {
    getSearchBar().type('carniatto').submit();

    cy.location('pathname').should('eq', '/results');

    getPaginator().should('not.be.visible');

    getSearchBar().get('input').should('contain.value', 'carniatto');

    getTitleH3().should('have.text', '3 users');

    const resultCard = getResultCard();
    resultCard.should('have.length', 3);

    resultCard.first().within((card) => {
      cy.get('.avatar').should(
        'have.attr',
        'src',
        'https://avatars0.githubusercontent.com/u/1366831?v=4'
      );
      cy.get('.name').should('have.text', 'Mateus Carniatto');
      cy.get('.name').should(
        'have.attr',
        'href',
        'https://github.com/Carniatto'
      );
      cy.get('.login').should('have.text', 'Carniatto');
      cy.get('.login').should(
        'have.attr',
        'href',
        'https://github.com/Carniatto'
      );
      cy.get('.card-body > .bio').should('contain.text', 'Tech enthusiast');
      const cardFooterChilds = cy.get('.card-footer > div').first();

      cardFooterChilds.should('have.text', 'Brussels - Belgium');
      cardFooterChilds.next().should('have.text', 'Followers: 11');
      cardFooterChilds.next().should('have.text', 'Following: 7');
    });
  });
});

describe('user-seeker results multiple pages', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.server();
    cy.route('**/search/users?q=carniatto*', 'fixture:search-users-multipage');
    cy.route('**/users/*', 'fixture:user-detail');
  });

  it('Should show paginator', () => {
    getSearchBar().type('carniatto').submit();

    cy.location('pathname').should('eq', '/results');

    getTitleH3().should('have.text', '1000 users');

    const paginator = getPaginator();

    paginator.should('be.visible');

    paginator.within((paginator) => {
      cy.get('.selected').should('contain.text', '1');
      cy.get('[data-cy=ghr-paginator-previous]').should('be.disabled');
      cy.get('[data-cy=ghr-paginator-next]').should('not.be.disabled');

      cy.get('[data-cy=ghr-paginator-next]').click();
      cy.get('.selected').should('contain.text', '2');
      cy.get('[data-cy=ghr-paginator-previous]').should('not.be.disabled');
      cy.get('[data-cy=ghr-paginator-next]').should('not.be.disabled');

      cy.get('[data-cy=ghr-paginator-previous]').click();
      cy.get('.selected').should('contain.text', '1');
      cy.get('[data-cy=ghr-paginator-previous]').should('be.disabled');
      cy.get('[data-cy=ghr-paginator-next]').should('not.be.disabled');

      cy.get('[data-cy=ghr-paginator-lastpage]').click();
      cy.get('[data-cy=ghr-paginator-previous]').should('not.be.disabled');
      cy.get('[data-cy=ghr-paginator-next]').should('be.disabled');

      cy.get('[data-cy=ghr-paginator-firstpage]').click();
      cy.get('[data-cy=ghr-paginator-previous]').should('be.disabled');
      cy.get('[data-cy=ghr-paginator-next]').should('not.be.disabled');
    });
  });
});
