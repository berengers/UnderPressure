import { regularUser } from '../fixtures/users'

describe('Login', () => {
  it('Can login with Pierre user (fastLogin command)', () => {
    cy.visit('http://localhost:3000/')
    cy.get('[data-e2e="input-email"]').type(regularUser.email)
    cy.get('[data-e2e="input-password"]').type(regularUser.password)
    cy.get('[data-e2e="button-login"]').click()
    cy.get('[data-e2e="app-bar-container"]').should('be.visible')
  })
})
