import { mount } from '@cypress/vue';
import LoginView from '@/views/Account/LoginView.vue';
import { vi } from 'vitest';

vi.mock('lottie-web', () => ({
  loadAnimation: vi.fn(),
}));

describe('LoginView', () => {
  it('renders properly', () => {
    mount(LoginView);

    cy.get('h1').should('contain', 'Nice to see you again!');
    cy.get('button').should('contain', 'Log in');
  });

  it('validates form fields', () => {
    mount(LoginView);

    cy.get('button[type="submit"]').click();
    cy.get('p.text-red-500').should('contain', 'Email is required');
    cy.get('p.text-red-500').should('contain', 'Password is required');

    cy.get('#email').type('invalid-email');
    cy.get('#password').type('123');
    cy.get('button[type="submit"]').click();
    cy.get('p.text-red-500').should('contain', 'Email is invalid');
    cy.get('p.text-red-500').should('contain', 'Password is incorrect');
  });

  it('logs in successfully', () => {
    cy.intercept('POST', `${import.meta.env.VITE_API_URL}/auth/login`, {
      statusCode: 200,
      body: {
        accessToken: 'mocked-token',
        user: { id: 1, name: 'Test User' }
      }
    }).as('loginRequest');

    mount(LoginView);

    cy.get('#email').type('user@example.com');
    cy.get('#password').type('ValidPassword1!');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest');
    cy.url().should('eq', 'http://localhost:5173/');
  });

  it('handles login errors', () => {
    cy.intercept('POST', `${import.meta.env.VITE_API_URL}/auth/login`, {
      statusCode: 400,
      body: { code: 37 }
    }).as('loginErrorRequest');

    mount(LoginView);

    cy.get('#email').type('user@example.com');
    cy.get('#password').type('ValidPassword1!');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginErrorRequest');
    cy.get('.vue-toastification__toast--error').should('contain', 'Invalid password.');
  });

  it('redirects to social login URLs', () => {
    mount(LoginView);

    cy.window().then((win) => {
      cy.stub(win.location, 'assign').as('assign');
    });

    cy.get('button').contains('Google').click();
    cy.get('@assign').should('be.calledWith', `${import.meta.env.VITE_API_URL}/auth/google`);

    cy.get('button').contains('Discord').click();
    cy.get('@assign').should('be.calledWith', `${import.meta.env.VITE_API_URL}/auth/discord`);

    cy.get('button').contains('GitHub').click();
    cy.get('@assign').should('be.calledWith', `${import.meta.env.VITE_API_URL}/auth/github`);
  });
});
