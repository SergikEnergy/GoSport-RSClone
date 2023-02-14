// import { create } from 'domain';
import { createElement } from '../template/createElement';
import authorization from '../authorization/authorization';

export const renderWelcomePopup = (parent: HTMLElement): void => {
  const blackoutPopup = createElement('div', parent, 'blackout-popup');
  const welcomePopup = createElement('div', blackoutPopup, 'welcome-popup');
  const welcomeHeader = createElement('p', welcomePopup, 'welcome-popup__header');
  welcomeHeader.textContent = 'Добро пожаловать в GoSport!';
  const welcomeText = createElement('p', welcomePopup, 'welcome-popup__text');
  welcomeText.textContent =
    'Ищешь, где поиграть в футбол, баскетбол или может теннис? Или ищешь компанию для игры? В GoSport ты сможешь найти и то, и другое. Здесь мы собираем все доступные площадки города и людей, которые хотят поиграть в любимый вид спорта и весело провести время. Если интересно, то присоединяйся к нам!';
  const welcomeButton = createElement('button', welcomePopup, 'button_welcome');
  welcomeButton.textContent = 'Начнём!';
  const formContainer = createElement('div', blackoutPopup, 'container-forms form_hidden');

  welcomeButton.addEventListener('click', () => {
    welcomePopup.classList.add('welcome-popup_hidden');
    window.setTimeout(async () => {
      welcomePopup.classList.add('form_hidden');
      formContainer.classList.remove('form_hidden');
      await authorization(formContainer);
    }, 1050);
  });
};
