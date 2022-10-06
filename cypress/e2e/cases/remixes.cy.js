describe('Load page', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit('http://localhost:3000/');
    cy.get('[data-link="remixes"]').should('contain', 'Remixes').click();
    cy.wait(1000);
  });

  it('Add new remix', () => {
    cy.get('[data-button="add"]').click();
    cy.get('[data-input="name"]').type('Tik-tok King');
    cy.get('[data-input="authorEmail"]').type('tiktok@ok.ru');
    cy.get('[data-input="description"]').type('Something interesting');
    cy.get('[data-input="price"]').type('12');
    cy.get('[data-input="trackLength"]').type('12');
    cy.get('[data-button="submit"]').click();
    cy.wait(3000);
  });

  it('Edit remix', () => {
    cy.contains('td', 'Tik-tok King').parent().find('[data-button="edit"]').click();
    cy.get('[data-input="name"]').clear().type('Test King');
    cy.get('[data-input="authorEmail"]').clear().type('test@test.ru');
    cy.get('[data-button="submit"]').click();
    cy.wait(3000);
  });

  it('Delete remix', () => {
    cy.get('[data-table="remixes"]').should('contain', 'Test King');
    cy.contains('td', 'Test King').parent().find('[data-button="delete"]').click();
    cy.get('[data-table="remixes"]').should('not.contain.value', 'Test King');
  });

  it('Cancel adding', () => {
    cy.get('[data-button="add"]').click();
    cy.get('[data-input="name"]').type('Tik-tok King');
    cy.get('[data-button="cancel"]').click();
    cy.get('[data-button="add"]').click();
    cy.get('[data-input="name"]').should('not.contain.value');
  });
});
