import Page from '../../template/page';

export default class ProfilePage extends Page {
  static textObject = {
    MainTitle: 'ProfilePage',
  };

  constructor(id: string) {
    super(id);
  }

  render() {
    const title = this.createHeaderTitle(ProfilePage.textObject.MainTitle);
    this.container.append(title);
    return this.container;
  }
}
