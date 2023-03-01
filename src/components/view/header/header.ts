import { createElement } from '../template/createElement';
import SelectionLang from '../pages/translation/lang-selection';
import { IData } from '../pages/translation/dataType';

class Header {
  chooseLangComponent!: SelectionLang;
  chooseLang!: number;
  wordsArr!: IData[];
  wordsChooseArr!: IData;

  renderHeader(parent: HTMLElement): void {
    this.getData();

    const wrapper = createElement('div', parent, 'wrapper header__wrapper');
    const logo = createElement('a', wrapper, 'logo');
    logo.setAttribute('href', '#main-page');
    createElement('span', logo, 'logo__image');
    const logoText = createElement('span', logo, 'logo__text');
    logoText.textContent = 'GoSport';
    const rightBlock = createElement('div', wrapper, 'header__right-block');
    const lang = createElement('button', rightBlock, 'button_lang');

    if (localStorage.getItem('lang') === '1') {
      lang.textContent = 'en';
    } else {
      lang.textContent = 'ru';
    }

    lang.addEventListener('click', () => {
      if (lang.textContent === 'ru') {
        localStorage.setItem('lang', '1');
        lang.textContent = 'en';
        location.reload();
      } else {
        localStorage.setItem('lang', '0');
        lang.textContent = 'ru';
        location.reload();
      }
    });

    createElement('span', rightBlock, 'theme');
    const cityList = createElement('p', rightBlock, 'city-list');
    cityList.textContent = `${this.wordsChooseArr.header_city}`;
    createElement('div', rightBlock, 'user-logo');
    const arrow = createElement('span', rightBlock, 'user-arrow');
    const userList = createElement('ul', rightBlock, 'user-list');
    arrow.addEventListener('click', () => {
      userList.classList.add('active');
    });
    const userProfile = createElement('li', userList, 'user-list__item');
    userProfile.textContent = `${this.wordsChooseArr.heder_profile}`;

    userProfile.addEventListener('click', () => {
      userList.classList.remove('active');
      this.redirectToProfile();
    });

    const userSingOut = createElement('li', userList, 'user-list__item');
    userSingOut.textContent = `${this.wordsChooseArr.header_profile_exit}`;

    userSingOut.addEventListener('click', () => {
      this.logout();
    });
  }

  getData() {
    this.chooseLangComponent = new SelectionLang();
    this.wordsArr = this.chooseLangComponent.dataArr;
    this.chooseLang = this.chooseLangComponent.determinationLanguage();
    this.wordsChooseArr = this.wordsArr[this.chooseLang];
  }

  logout(): void {
    window.location.href = '';
    window.location.reload();
  }

  redirectToProfile(): void {
    window.location.hash = 'profile-page';
  }
}

export default new Header();
