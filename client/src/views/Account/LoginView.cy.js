import LoginView from './LoginView.vue'

describe('<LoginView />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(LoginView)
  })
})