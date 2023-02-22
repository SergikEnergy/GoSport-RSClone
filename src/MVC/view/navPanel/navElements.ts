import PageIds from '../../router/router.types';

const Buttons = [
  {
    id: PageIds.MainPageUrl,
    text: 'Main Page',
    className: 'base-link',
  },
  {
    id: PageIds.EventsPageUrl,
    text: 'Events Page',
    className: 'base-link',
  },
  {
    id: PageIds.ProfilePageUrl,
    text: 'Profile Page',
    className: 'base-link',
  },
];

class NavPanel {
  protected container: HTMLElement;

  constructor(tagName: string, className: string) {
    this.container = document.createElement(tagName);
    this.container.className = className;
  }

  renderNavButtons() {
    const navButtons = document.createElement('div');
    navButtons.className = 'main-navigation';
    navButtons.id = 'mainNavigation';
    Buttons.forEach((button) => {
      const buttonLink = document.createElement('a');
      buttonLink.href = `#${button.id}`;
      buttonLink.className = 'main-navigation__link';
      buttonLink.innerText = `${button.text}`;
      navButtons.append(buttonLink);
    });
    this.container.append(navButtons);
  }

  renderNavPanel() {
    this.renderNavButtons();
    return this.container;
  }
}

export default NavPanel;
