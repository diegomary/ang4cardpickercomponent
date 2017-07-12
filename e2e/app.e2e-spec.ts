import { CardpickerPage } from './app.po';

describe('cardpicker App', () => {
  let page: CardpickerPage;

  beforeEach(() => {
    page = new CardpickerPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
