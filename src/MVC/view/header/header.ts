import { createElement } from '../template/createElement';

export const renderHeader = (parent: HTMLElement):void => {
  const header = createElement('header', parent, 'header');
  const wrapper = createElement('div', header, 'wrapper header__wrapper');
  const logo = createElement('a', wrapper, 'logo');
  createElement('span', logo, 'logo__image');
  const logoText = createElement('span', logo, 'logo__text');
  logoText.textContent = 'GoSport';
  const rightBlock = createElement('div', wrapper, 'header__right-block');
  const lang = createElement('button', rightBlock, 'button_lang');
  lang.textContent = 'ru';
  createElement('span', rightBlock, 'theme');
  const cityList = createElement('p', rightBlock, 'city-list');
  cityList.textContent = 'Минск';
  createElement('div', rightBlock, 'user-logo');
  const arrow = createElement('span', rightBlock, 'user-arrow');
  const userList = createElement('ul', rightBlock, 'user-list');
  arrow.addEventListener('click', () => {
    userList.classList.toggle('active');
  });
  const userProfile = createElement('li', userList, 'user-list__item');
  userProfile.textContent = 'Profile';
  const userSingOut = createElement('li', userList, 'user-list__item');
  userSingOut.textContent = 'Sing out';
}