describe('Blog app', function() {
  const user = {
    username: 'root',
    password: 'salainen'
  }
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Login').click()
    cy.contains('Username:')
    cy.contains('Password:')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('Login').click()
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#login').click()

      cy.get('.confirm').contains('Welcome back,')
    })

    it('fails with wrong credentials', function() {
      cy.contains('Login').click()
      cy.get('#username').type(user.username)
      cy.get('#password').type('jyyh')
      cy.get('#login').click()

      cy.get('.error').contains('Wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login', user)
        .then(response => {
          localStorage.setItem('loggedUser', JSON.stringify(response.body))
          cy.visit('http://localhost:3000')
        })
    })

    it('A blog can be created', function() {
      cy.contains('Create new').click()
      cy.get('#title').type('Duo')
      cy.get('#author').type('samu ja joona')
      cy.get('#url').type('areena.yle.fi')
      cy.get('#create').click()

      cy.get('.confirm').contains('Added Duo by samu ja joona')
      cy.contains('Duo -- samu ja joona')
    })

    it('A blog can be liked', function() {
      cy.contains('Create new').click()
      cy.get('#title').type('Duo')
      cy.get('#author').type('samu ja joona')
      cy.get('#url').type('areena.yle.fi')
      cy.get('#create').click()

      cy.contains('Duo -- samu ja joona').click()
      cy.get('.likeButton').click()
      cy.contains('Likes: 1')
    })

    it('A blog can be deleted', function() {
      cy.contains('Create new').click()
      cy.get('#title').type('Duo')
      cy.get('#author').type('samu ja joona')
      cy.get('#url').type('areena.yle.fi')
      cy.get('#create').click()

      cy.contains('Delete').click()
      cy.get('.confirm').contains('Deleted Duo by samu ja joona ')
    })
  })
})