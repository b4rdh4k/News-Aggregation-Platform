describe('Personalized News Page', () => {
    beforeEach(() => {
      cy.visit('/for-you')
    })
  
    it('displays loading animation initially', () => {
      cy.get('.flex.justify-center.items-center.h-48').should('be.visible')
    })
  
    it('displays main content after loading', () => {
      cy.get('.flex.justify-center.items-center.h-48').should('not.exist')
      cy.get('.container.mx-auto').should('be.visible')
      
      cy.get('h1').contains('Your topics').should('be.visible')
      cy.get('button').contains('Preferences').should('be.visible')
  
      cy.get('.grid.grid-cols-1').within(() => {
        cy.get('.rounded-lg.shadow-inner').should('have.length.greaterThan', 0)
      })
  
      cy.get('h1').contains('Special news').should('be.visible')
      cy.get('.grid.grid-cols-1').within(() => {
        cy.get('.rounded-lg.shadow-inner').should('have.length.greaterThan', 0)
      })
    })
  
    it('opens and closes the preferences modal', () => {
      cy.get('button').contains('Preferences').click()
      cy.getComponent('PreferencesModal').should('be.visible')
      cy.getComponent('PreferencesModal').find('.close-button').click()
      cy.getComponent('PreferencesModal').should('not.exist')
    })
  
    it('opens and closes the article modal', () => {
      cy.get('.flex.justify-center.items-center.h-48').should('not.exist')
      cy.get('.grid.grid-cols-1').within(() => {
        cy.get('.rounded-lg.shadow-inner').first().click()
      })
      cy.getComponent('ArticleModal').should('be.visible')
      cy.getComponent('ArticleModal').find('.close-button').click()
      cy.getComponent('ArticleModal').should('not.exist')
    })
  
    it('handles pagination', () => {
        const currentPage = 1;
      
        cy.get('.flex.justify-center.items-center.h-48').should('not.exist')
        cy.get('button').contains('Previous').should('be.disabled')
        cy.get('button').contains('Next').should('not.be.disabled').click()
        cy.get('span').contains(currentPage + 1).should('be.visible')
      })
      
  })
  