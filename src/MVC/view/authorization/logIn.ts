import { createElement } from '../template/createElement';
import { IGetUser, IGetError, ILogIn } from './authorization.types';

const logUrl = 'http://localhost:5000/api/login';

class LogIn {
  url: string;

  constructor(logUrl: string) {
    this.url = logUrl;
  }

  renderLoginForm(): void {
    const parentElement = document.querySelector('body') as HTMLElement;
    const containerForms = createElement('div', parentElement, 'container-forms');

    const formLogIn = createElement('form', containerForms, 'login-form');
    formLogIn.setAttribute('action', '#');
    formLogIn.setAttribute('id', 'loginToAccount');

    const formRegister = createElement('form', containerForms, 'create-form');
    formRegister.setAttribute('action', '#');
    formRegister.setAttribute('id', 'createAccount');

    const loginTitle = createElement('h2', formLogIn, 'login-form__title');
    loginTitle.textContent = 'Login';

    const loginFormMessage = createElement('div', formLogIn, 'login-form__message login-form__message_error');
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
    const errorPassword = createElement('div', inputGroupPassword, 'login-form__input-error-message');
    errorPassword.classList.add('form_hidden');
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
      errorBlock.textContent = `${elem} shouldn't be empty`;
      return false;
    }
    return true;
  }

  checkPasswordLength(elem: HTMLInputElement, errorElement: HTMLElement): boolean {
    const password: string = elem.value;
    if (password.length < 4 && password.length > 10) {
      errorElement.textContent = `Password should contain more 4 and less 10 symbols`;
      return false;
    }
    return true;
  }

  async checkNamePass(name: string, pass: string) {
    try {
      let isValid = false;
      const checkUser = await fetch(`${this.url}+/login`, {
        method: 'GET',
        body: JSON.stringify({
          nickName: name,
          password: pass,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const dataResponse = await checkUser.json();
      if (dataResponse && dataResponse.date) {
        return isValid;
      }
      if (dataResponse && dataResponse.nickName) {
        isValid = true;
        return isValid;
      }
    } catch (err) {
      throw new Error('failed validation name/password');
    }
  }
}

export default new LogIn(logUrl);
