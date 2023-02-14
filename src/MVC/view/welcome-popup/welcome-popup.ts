import { createElement } from "../template/createElement";

export const renderWelcomePopup = (parent: HTMLElement):void => {
  const blackoutPopup = createElement('div', parent, 'blackout-popup');
  const welcomePopup = createElement('div', blackoutPopup, 'welcome-popup');
  const welcomeHeader = createElement('p', welcomePopup, 'welcome-popup__header');
  welcomeHeader.textContent = 'Добро пожаловать в GoSport!';
  const welcomeText = createElement('p', welcomePopup, 'welcome-popup__text');
  welcomeText.textContent = 'Ищешь, где поиграть в футбол, баскетбол или может теннис? Или ищешь компанию для игры? В GoSport ты сможешь найти и то, и другое. Здесь мы собираем все доступные площадки города и людей, которые хотят поиграть в любимый вид спорта и весело провести время. Если интересно, то присоединяйся к нам!';
  const welcomeButton = createElement('button', welcomePopup, 'button_welcome');
  welcomeButton.textContent = 'Начнём!';

  welcomeButton.addEventListener('click', () => {
    blackoutPopup.classList.add('close');
  })
}