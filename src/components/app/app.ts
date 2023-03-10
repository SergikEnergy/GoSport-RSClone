import Router from '../router/router';
import { createElement } from '../view/template/createElement';
import Header from '../view/header/header';
import Footer from '../view/footer/footer';
import PopUp from '../view/welcome-popup/welcome-popup';

export default class App {
  renderBaseElements(): void {
    const container = document.body;
    const headerContainer = createElement('header', container, 'header');
    createElement('main', container, 'main-content');
    const footerContainer = createElement('footer', container, 'footer');

    Header.renderHeader(headerContainer);
    Footer.renderFooter(footerContainer);
  }

  run(): void {
    const router = new Router();
    router.run();
    PopUp.renderPopup();
    PopUp.renderWelcomePopup();
  }
}