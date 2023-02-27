import { createElement } from '../template/createElement';
import authorization from '../authorization/authorization';
import SelectionLang from '../pages/translation/lang-selection';

interface IData {
  [key: string]: string;
}
class PopUp {
  parent: HTMLElement;
  chooseLangComponent!: SelectionLang;
  chooseLang!: number;
  wordsArr!: IData[];
  wordsChooseArr!: IData;

  constructor(parent: HTMLElement) {
    this.parent = parent;
  }

  renderPopup(): HTMLElement {
    const blackoutPopup = createElement('div', this.parent, 'blackout-popup');
    this.parent.classList.add('off-scroll');
    return blackoutPopup;
  }

  renderWelcomePopup(): void {
    this.getData();
    const mainPopup = document.querySelector('.blackout-popup') as HTMLDivElement;
    const welcomePopup = createElement('div', mainPopup, 'welcome-popup');
    const welcomeHeader = createElement('p', welcomePopup, 'welcome-popup__header');
    welcomeHeader.textContent = `${this.wordsChooseArr.welcome_header}`;
    const welcomeText = createElement('p', welcomePopup, 'welcome-popup__text');
    welcomeText.textContent = `${this.wordsChooseArr.welcome_text}`;
    const welcomeButton = createElement('button', welcomePopup, 'button_welcome');
    welcomeButton.textContent = `${this.wordsChooseArr.welcome_button}`;
    const formContainer = createElement('div', mainPopup, 'container-forms form_hidden');
    let isClickedGoSport = true;

    welcomeButton.addEventListener('click', () => {
      welcomePopup.classList.add('welcome-popup_hidden');
      window.setTimeout(async () => {
        welcomePopup.classList.add('form_hidden');
        formContainer.classList.remove('form_hidden');

        if (isClickedGoSport) {
          authorization(formContainer);
          isClickedGoSport = false;
        }
      }, 1050);
    });
  }

  getData() {
    this.chooseLangComponent = new SelectionLang();
    this.wordsArr = this.chooseLangComponent.dataArr;
    this.chooseLang = this.chooseLangComponent.determinationLanguage();
    this.wordsChooseArr = this.wordsArr[this.chooseLang]
  }
}

export default new PopUp(document.body);
