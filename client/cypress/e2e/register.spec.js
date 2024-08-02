describe('Registration Page', () => {
    beforeEach(() => {
      cy.visit('/register')
    })
  
    it('Displays registration form elements', () => {
      cy.get('input#username').should('be.visible')
      cy.get('input#fullName').should('be.visible')
      cy.get('input#email').should('be.visible')
      cy.get('input#birthdate').should('be.visible')
      cy.get('input#password').should('be.visible')
      cy.get('input#confirmPassword').should('be.visible')
      cy.get('button[type="submit"]').should('be.visible')
    })
  
    it('Validates form fields', () => {
      cy.get('button[type="submit"]').click()
      
      cy.contains('Email is required').should('be.visible')
      cy.contains('Username is required').should('be.visible')
      cy.contains('Full Name is required').should('be.visible')
      cy.contains('Birthdate is required').should('be.visible')
      cy.contains('Password is required').should('be.visible')
      cy.contains('Confirm Password is required').should('be.visible')
  
      cy.get('input#email').type('invalid-email')
      cy.get('input#username').type('short')
      cy.get('input#fullName').type('SingleName')
      cy.get('input#birthdate').type('2020-01-01')
      cy.get('input#password').type('weak')
      cy.get('input#confirmPassword').type('different')
  
      cy.get('button[type="submit"]').click()
  
      cy.contains('Email is invalid').should('be.visible')
      cy.contains('Username must be between 6 and 12 characters').should('be.visible')
      cy.contains('Full Name must have at least two words').should('be.visible')
      cy.contains('You must be of legal age to register an account').should('be.visible')
      cy.contains('Password must be at least 8 characters').should('be.visible')
      cy.contains('Passwords do not match').should('be.visible')
    })
  
    it('Registers a user successfully', () => {
      cy.get('input#email').type('test@example.com')
      cy.get('input#username').type('testuser')
      cy.get('input#fullName').type('Test User')
      cy.get('input#birthdate').type('2000-01-01')
      cy.get('input#password').type('StrongPass1!')
      cy.get('input#confirmPassword').type('StrongPass1!')
  
      cy.intercept('POST', '**/auth/register', {
        statusCode: 200,
        body: {
          accessToken: 'dummyAccessToken',
          user: {
            id: 1,
            username: 'testuser',
            email: 'test@example.com',
          }
        }
      }).as('register')
  
      cy.get('button[type="submit"]').click()
      cy.wait('@register')
  
      cy.contains('Registration was successful!').should('be.visible')
      cy.url().should('include', '/login')
    })
  
    it('Handles social login clicks', () => {
      cy.get('button[aria-label="Google"]').click()
      cy.url().should('include', '/auth/google')
  
      cy.visit('/register')
      cy.get('button[aria-label="Discord"]').click()
      cy.url().should('include', '/auth/discord')
  
      cy.visit('/register')
      cy.get('button[aria-label="GitHub"]').click()
      cy.url().should('include', '/auth/github')
    })
  })
  