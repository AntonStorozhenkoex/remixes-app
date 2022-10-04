describe('First test', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit('http://localhost:3000/');
    cy.get('[data-link="remixes"]').click();
  });

  it('add new remix', () => {
    cy.get('[data-button="add"]').click();
    cy.get('input[name="name"]').type('Tik-tik King');
    cy.get('input[name="authorEmail"]').type('tiktok@ok.ru');
    cy.get('input[name="description"]').type('Something interesting');
    cy.get('input[name="price"]').type('12');
    cy.get('input[name="trackLength"]').type('12');
    cy.get('button[type="submit"]').click();
  });
});
