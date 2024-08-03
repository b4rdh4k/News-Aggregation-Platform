describe('Categories Page', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/categories', {
      statusCode: 200,
      body: {
        categories: [
          { id: '1', name: 'Category 1', articles: [{ id: 'a1', title: 'Article 1' }] },
          { id: '2', name: 'Category 2', articles: [] },
          { id: '3', name: 'Category 3', articles: [{ id: 'a2', title: 'Article 2' }] },
          { id: '4', name: 'Category 4', articles: [{ id: 'a3', title: 'Article 3' }] }
        ]
      }
    }).as('fetchCategories')

    cy.visit('/categories')

    it('displays loading animation while fetching categories', () => {
      cy.get('.flex.justify-center.items-center.h-48').should('be.visible')
    })

    it('displays categories and handles pagination', () => {
      cy.wait('@fetchCategories')
      cy.get('.flex.justify-center.items-center.h-48').should('not.exist')

      cy.get('.grid.grid-cols-1 .p-4').should('have.length', 3)
      cy.get('.grid.grid-cols-1 .p-4').first().contains('Category 1')

      cy.get('button').contains('Next').should('not.be.disabled').click()
      cy.get('.grid.grid-cols-1 .p-4').should('have.length', 1)
      cy.get('.grid.grid-cols-1 .p-4').first().contains('Category 4')

      cy.get('button').contains('Previous').should('not.be.disabled').click()
      cy.get('.grid.grid-cols-1 .p-4').should('have.length', 3)
      cy.get('.grid.grid-cols-1 .p-4').first().contains('Category 1')
    })

    it('handles navigation to more articles', () => {
      cy.get('.grid.grid-cols-1 .p-4')
        .first()
        .within(() => {
          cy.get('button').contains('More articles').click()
        })

      cy.url().should('include', '/category/1')
    })

    it('displays error toast if categories fail to load', () => {
      cy.intercept('GET', '/api/categories', {
        statusCode: 500,
        body: { error: 'Internal Server Error' }
      }).as('fetchCategoriesError')

      cy.visit('/categories')

      cy.contains('Failed to fetch categories.').should('be.visible')
    })
  })
})
