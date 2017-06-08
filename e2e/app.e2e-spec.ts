import { ProjecttwoPage } from './app.po';

describe('projecttwo App', function() {
  let page: ProjecttwoPage;

  beforeEach(() => {
    page = new ProjecttwoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
