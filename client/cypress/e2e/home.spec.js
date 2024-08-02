describe('Home Page', () => {
    beforeEach(() => {
      cy.visit('/')
    })
  
    it('displays loading animation initially', () => {
      cy.get('.flex.justify-center.items-center.h-48').should('be.visible')
    })
  
    it('displays the main content after loading', () => {
      cy.get('.flex.justify-center.items-center.h-48').should('not.exist')
      cy.get('.container.mx-auto').should('be.visible')
  
      cy.getComponent('WeatherWidget').should('be.visible')
      cy.get('h2').contains('Top stories').should('be.visible')
      cy.getComponent('TopStories').should('be.visible')
      cy.get('h2').contains('Picks for you').should('be.visible')
      cy.getComponent('PicksForYou').should('be.visible')
      cy.getComponent('LatestNews').should('be.visible')
  
      cy.get('h2').contains('Curiosity killed the cat').should('be.visible')
      cy.get('button').contains('LEARN MORE').should('be.visible')
    })
  
    it('navigates to the subscription page when "LEARN MORE" is clicked', () => {
      cy.get('.flex.justify-center.items-center.h-48').should('not.exist')
      cy.get('button').contains('LEARN MORE').click()
  
      cy.url().should('include', '/subscription')
    })
  })
  