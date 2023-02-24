import Page from '../../template/page';

export default class MainPage extends Page {
  static textObject = {
    MainTitle: 'MainPage123',
  };

  constructor(id: string) {
    super(id);
  }

  render() {
    const title = this.createHeaderTitle(MainPage.textObject.MainTitle);
    this.container.append(title);
    return this.container;
  }
}
