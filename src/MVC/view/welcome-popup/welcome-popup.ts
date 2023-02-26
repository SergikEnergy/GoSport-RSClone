import { createElement } from '../template/createElement';
import authorization from '../authorization/authorization';

class PopUp {
  parent: HTMLElement;
  constructor(parent: HTMLElement) {
    this.parent = parent;
  }

  renderPopup(): HTMLElement {
    const blackoutPopup = createElement('div', this.parent, 'blackout-popup');
    this.parent.classList.add('off-scroll');
    return blackoutPopup;
  }

  renderWelcomePopup(): void {
    const mainPopup = document.querySelector('.blackout-popup') as HTMLDivElement;
    const welcomePopup = createElement('div', mainPopup, 'welcome-popup');
    const welcomeHeader = createElement('p', welcomePopup, 'welcome-popup__header');
    welcomeHeader.textContent = 'Добро пожаловать в GoSport!';
    const welcomeText = createElement('p', welcomePopup, 'welcome-popup__text');
    welcomeText.textContent =
      'Ищешь, где поиграть в футбол, баскетбол или может теннис? Или ищешь компанию для игры? В GoSport ты сможешь найти и то, и другое. Здесь мы собираем все доступные площадки города и людей, которые хотят поиграть в любимый вид спорта и весело провести время. Если интересно, то присоединяйся к нам!';
    const welcomeButton = createElement('button', welcomePopup, 'button_welcome');
    welcomeButton.textContent = 'Начнём!';
    const formContainer = createElement('div', mainPopup, 'container-forms form_hidden');

    welcomeButton.addEventListener('click', () => {
      welcomePopup.classList.add('welcome-popup_hidden');
      window.setTimeout(async () => {
        welcomePopup.classList.add('form_hidden');
        formContainer.classList.remove('form_hidden');

        authorization(formContainer);
      }, 1050);
    });
  }
}

export default new PopUp(document.body);
