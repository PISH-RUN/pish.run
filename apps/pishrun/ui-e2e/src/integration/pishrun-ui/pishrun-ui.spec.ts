describe('pishrun-ui: PishrunUi component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=pishrunui--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to PishrunUi!');
    });
});
