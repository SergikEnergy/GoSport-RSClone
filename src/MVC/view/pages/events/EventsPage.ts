import Page from '../../template/page';

export default class EventsPage extends Page {
  static textObject = {
    MainTitle: 'EventsPage',
  };

  constructor(id: string) {
    super(id);
  }

  render() {
    const title = this.createHeaderTitle(EventsPage.textObject.MainTitle);
    this.container.append(title);
    return this.container;
  }
}
