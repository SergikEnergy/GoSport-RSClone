import createUser from './createUser';
import LogIn from './logIn';
import SelectionLang from '../pages/translation/lang-selection';
import { IData } from '../pages/translation/dataType';

const logUrl = 'https://go-sport-app-clone.onrender.com/api/login';

function authorization(parent: HTMLElement) {
  let chooseLangComponent: SelectionLang;
  let chooseLang: number;
  let wordsArr: IData[];
  let wordsChooseArr: IData;

  getData();

  const loginHandler = new LogIn(logUrl);
  loginHandler.renderForm(parent);
  const containerForms = document.querySelector('.container-forms') as HTMLDivElement;
  const popUpContainer = document.querySelector('.blackout-popup') as HTMLElement;

  const nameInput = document.querySelector('#nickName') as HTMLInputElement;
  const passwordInput = document.querySelector('#password') as HTMLInputElement;
  const errorGeneral = document.querySelector('#errorGeneral') as HTMLDivElement;
  const errorName = document.querySelector('#errorNameLog') as HTMLDivElement;
  const errorPassword = document.querySelector('#passwordError') as HTMLDivElement;
  const loginButton = document.querySelector('#loginButton') as HTMLButtonElement;
  const redirectCreate = document.querySelector('#linkCreateAccount') as HTMLElement;

  loginButton.disabled = true;
  let correctName: boolean;
  let correctPassword: boolean;

  nameInput.addEventListener('blur', () => {
    if (!loginHandler.checkEmpty(nameInput, errorName)) {
      errorName.classList.remove('form_hidden');
      correctName = false;
      nameInput.classList.add('form__input_error');
    } else {
      correctName = true;
      if (correctName && correctPassword) {
        loginButton.disabled = false;
      }
    }
  });
  nameInput.addEventListener('input', () => {
    errorName.classList.add('form_hidden');
    nameInput.classList.remove('form__input_error');
    errorGeneral.classList.add('form_hidden');
  });

  passwordInput.addEventListener('blur', () => {
    const length = passwordInput.value.length;

    if (!loginHandler.checkPasswordLength(length, errorPassword)) {
      errorPassword.classList.remove('form_hidden');
      passwordInput.classList.add('form__input_error');
      correctPassword = false;
    } else {
      correctPassword = true;
      if (correctName && correctPassword) {
        loginButton.disabled = false;
      } else if (!correctName || !correctPassword) {
        loginButton.disabled = true;
      }
    }
  });

  passwordInput.addEventListener('input', () => {
    errorPassword.classList.add('form_hidden');
    passwordInput.classList.remove('form__input_error');
    errorGeneral.classList.add('form_hidden');
  });

  loginButton.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      const response = await loginHandler.getLogData(nameInput.value, passwordInput.value);

      console.log(response);
      if (response && response.data) {
        loginHandler.renderPasswordNameError(response.data, errorGeneral);
        errorGeneral.classList.remove('form_hidden');
      } else if (response && response[0].nickName) {
        if (!errorGeneral.classList.contains('form_hidden')) {
          errorGeneral.classList.add('form_hidden');
        }
        loginHandler.saveLocalStorage(response[0]._id);
        location.hash = '#' + 'main-page';
        containerForms.classList.add('form_hidden');
        popUpContainer.classList.add('close');
        document.body.classList.remove('off-scroll');
      } else if (response.error) {
        errorGeneral.innerText = `${wordsChooseArr.fetch_error}`;
        errorGeneral.classList.remove('form_hidden');
      }
    } catch (err) {
      errorGeneral.innerText = `${wordsChooseArr.fetch_error}`;
      errorGeneral.classList.remove('form_hidden');
      console.log(err);
    }
  });

  createUser();

  redirectCreate.addEventListener('click', (e) => {
    //here will be animation
    e.preventDefault();
    containerForms.classList.toggle('active-form');
  });

  function getData() {
    chooseLangComponent = new SelectionLang();
    wordsArr = chooseLangComponent.dataArr;
    chooseLang = chooseLangComponent.determinationLanguage();
    wordsChooseArr = wordsArr[chooseLang]
  }
  // return currentUser;
}

export default authorization;
