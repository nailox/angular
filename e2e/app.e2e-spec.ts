import { BookStoreTemplatePage } from './app.po';

describe('abp-project-name-template App', function() {
  let page: BookStoreTemplatePage;

  beforeEach(() => {
    page = new BookStoreTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
