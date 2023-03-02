import { createElement } from '../template/createElement';
import { ILogIn } from './authorization.types';
import SelectionLang from '../pages/translation/lang-selection';
import { IData } from '../pages/translation/dataType';
// import { getErrorOrUser } from './authorization.types';
export default class LogIn {
  url: string;
  chooseLangComponent!: SelectionLang;
  chooseLang!: number;
  wordsArr!: IData[];
  wordsChooseArr!: IData;

  constructor(logUrl: string) {
    this.url = logUrl;
  }

  renderForm(parent: HTMLElement): void {
    this.getData();
    const parentElement = parent;

    const wrapperLogIn = createElement('div', parentElement, 'form-wrapper wrapper_login');

    const formLogIn = createElement('form', wrapperLogIn, 'login-form');
    formLogIn.setAttribute('action', '#');
    formLogIn.setAttribute('id', 'loginToAccount');

    const loginTitle = createElement('h2', formLogIn, 'login-form__title');
    loginTitle.textContent = `${this.wordsChooseArr.authorization_header}`;

    const loginFormMessage = createElement('div', formLogIn, 'login-form__message login-form__message_error form_hidden');
    loginFormMessage.setAttribute('id', 'errorGeneral');
    loginFormMessage.textContent = `${this.wordsChooseArr.welcome_button}`;

    const inputGroupName = createElement('div', formLogIn, 'login-form__input-group');
    const inputName = createElement('input', inputGroupName, 'login-form__input');
    inputName.setAttribute('placeholder', `${this.wordsChooseArr.create_account_login_placeholder}`);
    inputName.setAttribute('id', 'nickName');
    inputName.setAttribute('type', 'text');
    inputName.setAttribute('autofocus', 'true');
    const errorName = createElement('div', inputGroupName, 'login-form__input-error-message');
    errorName.classList.add('form_hidden');
    errorName.setAttribute('id', 'errorNameLog');
    errorName.textContent = `${this.wordsChooseArr.create_account_login_check}`;

    const inputGroupPassword = createElement('div', formLogIn, 'login-form__input-group');
    const inputPassword = createElement('input', inputGroupPassword, 'login-form__input');
    inputPassword.setAttribute('placeholder', `${this.wordsChooseArr.create_account_password_placeholder}`);
    inputPassword.setAttribute('id', 'password');
    inputPassword.setAttribute('type', 'password');
    const errorPassword = createElement('div', inputGroupPassword, 'login-form__input-error-message form_hidden');
    errorPassword.setAttribute('id', 'passwordError');
    errorPassword.textContent = `${this.wordsChooseArr.create_account_password_check2}`;

    const loginButton = createElement('button', formLogIn, 'form__button');
    loginButton.setAttribute('id', 'loginButton');
    loginButton.setAttribute('type', 'submit');
    loginButton.textContent = `${this.wordsChooseArr.authorization_button}`;

    const redirectCreate = createElement('p', formLogIn, 'form__text');
    const redirectCreateLink = createElement('a', redirectCreate, 'form__link');
    redirectCreateLink.setAttribute('id', 'linkCreateAccount');
    redirectCreateLink.setAttribute('href', './');
    redirectCreateLink.textContent = `${this.wordsChooseArr.authorization_message}`;
  }

  checkEmpty(elem: HTMLInputElement, errorBlock: HTMLElement): boolean {
    if (elem.value === '') {
      errorBlock.textContent = `${this.wordsChooseArr.create_account_login_check_empty}`;
      return false;
    }
    return true;
  }

  checkPasswordLength(length: number, errorElement: HTMLDivElement): boolean {
    if (!(length > 4 && length < 10)) {
      errorElement.textContent = `${this.wordsChooseArr.create_account_password_check}`;
      return false;
    }
    return true;
  }

  async getLogData(name: string, pass: string) {
    try {
      const body: ILogIn = {
        nickName: name,
        password: pass,
      };

      const getUser = await fetch(`${this.url}`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      });
      const data = await getUser.json();
      return data;
    } catch (err) {
      return {
        error: err,
        message: 'failed getting login response',
      };
    }
  }
  renderPasswordNameError(error: string, errorBlock: HTMLElement) {
    if (error === 'password') {
      errorBlock.textContent = `${this.wordsChooseArr.create_account_password_check2}`;
    }
    if (error === 'userName') {
      errorBlock.textContent = `${this.wordsChooseArr.authorization_login_check}`;
    }
  }

  saveLocalStorage(idUser: string) {
    if (idUser) window.localStorage.setItem('currentUserId', `${idUser}`);
    else window.localStorage.setItem('currentUserId', '');
  }

  getData() {
    this.chooseLangComponent = new SelectionLang();
    this.wordsArr = this.chooseLangComponent.dataArr;
    this.chooseLang = this.chooseLangComponent.determinationLanguage();
    this.wordsChooseArr = this.wordsArr[this.chooseLang]
  }
}
