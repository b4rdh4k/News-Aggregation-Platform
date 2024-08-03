// cypress.config.js
import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173', // Ensure this matches your Vite server URL
    specPattern: 'cypress/e2e/**/*.spec.js',
    supportFile: 'cypress/support/e2e.js',
    projectId: "4g5ga9",
    //setupNodeEvents(on, config) {
      // implement node event listeners here
    //},
  },
})
