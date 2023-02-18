import { createElement } from '../template/createElement';
import { ILogIn, IGetUser } from './authorization.types';
// import { getErrorOrUser } from './authorization.types';

export default class LogIn {
  url: string;

  constructor(logUrl: string) {
    this.url = logUrl;
  }

  renderForm(parent: HTMLElement): void {
    const parentElement = parent;

    const formLogIn = createElement('form', parentElement, 'login-form');
    formLogIn.setAttribute('action', '#');
    formLogIn.setAttribute('id', 'loginToAccount');

    const loginTitle = createElement('h2', formLogIn, 'login-form__title');
    loginTitle.textContent = 'Login';

    const loginFormMessage = createElement('div', formLogIn, 'login-form__message login-form__message_error form_hidden');
    loginFormMessage.setAttribute('id', 'errorGeneral');
    loginFormMessage.textContent = 'Incorrect username/password';

    const inputGroupName = createElement('div', formLogIn, 'login-form__input-group');
    const inputName = createElement('input', inputGroupName, 'login-form__input');
    inputName.setAttribute('placeholder', 'Input user name');
    inputName.setAttribute('id', 'nickName');
    inputName.setAttribute('type', 'text');
    inputName.setAttribute('autofocus', 'true');
    const errorName = createElement('div', inputGroupName, 'login-form__input-error-message');
    errorName.classList.add('form_hidden');
    errorName.setAttribute('id', 'errorNameLog');
    errorName.textContent = 'Incorrect nick name';

    const inputGroupPassword = createElement('div', formLogIn, 'login-form__input-group');
    const inputPassword = createElement('input', inputGroupPassword, 'login-form__input');
    inputPassword.setAttribute('placeholder', 'Input password');
    inputPassword.setAttribute('id', 'password');
    inputPassword.setAttribute('type', 'password');
    const errorPassword = createElement('div', inputGroupPassword, 'login-form__input-error-message form_hidden');
    errorPassword.setAttribute('id', 'passwordError');
    errorPassword.textContent = 'Incorrect password';

    const loginButton = createElement('button', formLogIn, 'form__button');
    loginButton.setAttribute('id', 'loginButton');
    loginButton.setAttribute('type', 'submit');
    loginButton.textContent = 'Continue';

    const redirectCreate = createElement('p', formLogIn, 'form__text');
    const redirectCreateLink = createElement('a', redirectCreate, 'form__link');
    redirectCreateLink.setAttribute('id', 'linkCreateAccount');
    redirectCreateLink.setAttribute('href', './');
    redirectCreateLink.textContent = `Don't have an account? Create account`;
  }

  checkEmpty(elem: HTMLInputElement, errorBlock: HTMLElement): boolean {
    if (elem.value === '') {
      errorBlock.textContent = `Field name shouldn't be empty`;
      return false;
    }
    return true;
  }

  checkPasswordLength(length: number, errorElement: HTMLDivElement): boolean {
    if (!(length > 4 && length < 10)) {
      errorElement.textContent = `Password should contain more 4 and less 10 symbols`;
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
      errorBlock.textContent = 'Incorrect password';
    }
    if (error === 'userName') {
      errorBlock.textContent = `User didn't find, input another user name, please`;
    }
  }

  saveLocalStorage(user: IGetUser) {
    const userToString = JSON.stringify(user);
    if (user) window.localStorage.setItem('currentUser', `${userToString}`);
    else window.localStorage.setItem('currentUser', '');
  }
}
