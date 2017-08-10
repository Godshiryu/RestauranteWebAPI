import { RestauranteFrontPage } from './app.po';

describe('restaurante-front App', () => {
  let page: RestauranteFrontPage;

  beforeEach(() => {
    page = new RestauranteFrontPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
