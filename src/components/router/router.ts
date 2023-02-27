import Page from '../view/template/page';
import PageIds from './router.types';

import ProfilePage from '../view/pages/profile/profilePage';
import MainPage from '../view/pages/main/MainPage';
import EventsPage from '../view/pages/events/EventsPage';
import NavPanel from '../view/navPanel/navElements';
import ErrorPage from '../view/pages/notFound/404';

export default class Router {
  private initialPage: MainPage;

  private navigation: NavPanel;

  static renderNewPage(idPage: string) {
    const containerBase = document.querySelector('.main-content') as HTMLElement;
    containerBase.setAttribute('id', 'mainContent');
    containerBase.replaceChildren();
    let page: Page | null = null;

    if (idPage === PageIds.MainPageUrl) {
      page = new MainPage(idPage);
    } else if (idPage === PageIds.ProfilePageUrl) {
      page = new ProfilePage(idPage);
    } else if (idPage === PageIds.EventsPageUrl) {
      page = new EventsPage(idPage);
    } else {
      page = new ErrorPage(idPage, '404');
    }

    if (page) {
      const pageHTML = page.render();
      containerBase.append(pageHTML);
    }
  }

  private enableRouteChange() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      if (window.location.hash === '' || window.location.hash === '/') {
        Router.renderNewPage('main-page');
      } else {
        Router.renderNewPage(hash);
      }
    });
  }

  constructor() {
    this.initialPage = new MainPage('main-page');
    this.navigation = new NavPanel('nav', 'navigation');
  }

  run(): void {
    const headerBlock = document.querySelector('.header') as HTMLElement;
    headerBlock.append(this.navigation.renderNavPanel());

    this.enableRouteChange();
  }
}
