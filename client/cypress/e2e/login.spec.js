describe('Login Page', () => {
    before(() => {
      cy.visit('/login')
    })
  
    it('should display the login page with correct elements', () => {
      cy.contains('Nice to see you again!')
      cy.get('input#email').should('exist')
      cy.get('input#password').should('exist')
      cy.get('button[type="submit"]').should('exist')
      cy.contains('Forgot password?')
      cy.contains('Don\'t have an account?')
    })
  
    it('should show validation errors for invalid inputs', () => {
      cy.get('button[type="submit"]').click()
      cy.get('p.text-red-500').should('contain', 'Email is required')
      cy.get('p.text-red-500').should('contain', 'Password is required')
  
      cy.get('input#email').type('invalidemail')
      cy.get('input#password').type('short')
      cy.get('button[type="submit"]').click()
      cy.get('p.text-red-500').should('contain', 'Email is invalid')
      cy.get('p.text-red-500').should('contain', 'Password is incorrect')
    })
  
    it('should show error message for failed login attempt', () => {
      cy.intercept('POST', `${Cypress.env('VITE_API_URL')}/auth/login`, {
        statusCode: 401,
        body: {
          code: 37,
        }
      })
  
      cy.get('input#email').type('test@example.com')
      cy.get('input#password').type('wrongpassword')
      cy.get('button[type="submit"]').click()
  
      cy.contains('Invalid password.')
    })
  
    it('should log in successfully and redirect', () => {
      cy.intercept('POST', `${Cypress.env('VITE_API_URL')}/auth/login`, {
        statusCode: 200,
        body: {
          accessToken: 'fakeToken',
          user: { id: 1, name: 'Test User' }
        }
      })
  
      cy.get('input#email').type('test@example.com')
      cy.get('input#password').type('ValidPassword123!')
      cy.get('button[type="submit"]').click()
  
      cy.url().should('eq', Cypress.config().baseUrl + '/')
      cy.contains('Login successful!')
    })
  
    it('should handle login with social providers', () => {
      cy.intercept('GET', `${Cypress.env('VITE_API_URL')}/auth/google`, {
        statusCode: 302,
        headers: {
          Location: '/oauth2/callback'
        }
      })
  
      cy.get('button').contains('Google').click()
      cy.url().should('include', '/oauth2/callback')
    })
  })
  