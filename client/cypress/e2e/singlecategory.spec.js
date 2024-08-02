describe('Category Articles Page', () => {
    const categoryId = '1';
  
    beforeEach(() => {
      cy.intercept('GET', `/api/articles/${categoryId}`)
      cy.visit(`/category/${categoryId}`);
    });
  
    it('should display loading animation while fetching data', () => {
      cy.get('.h-48').should('exist').and('contain.text', 'Page is loading...');
    });
  
    it('should display articles when data is fetched successfully', () => {
      cy.wait('@fetchArticles');
      cy.get('div.grid').should('exist');
      cy.get('div.grid > div').should('have.length.greaterThan', 0);
    });
  
    it('should handle pagination correctly', () => {
      cy.wait('@fetchArticles');
      cy.get('.pagination button').should('have.length.greaterThan', 0);
      cy.get('.pagination button').first().click();
      cy.get('.pagination button').eq(1).click();
      cy.url().should('include', `/category/${categoryId}?page=2`);
    });
  });
  