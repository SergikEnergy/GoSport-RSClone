import { createElement } from '../template/createElement';

export const renderHeader = (parent: HTMLElement):void => {
  const wrapper = createElement('div', parent, 'wrapper header__wrapper');
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
  const linkUserProfile = createElement('a',userList,'user-list__link')
  const userProfile = createElement('li', linkUserProfile, 'user-list__item');
  userProfile.textContent = 'Profile';
  const linkUserSignOut = createElement('a',userList,'user-list__link')
  const userSingOut = createElement('li', linkUserSignOut, 'user-list__item');
  userSingOut.textContent = 'Sing out';
}