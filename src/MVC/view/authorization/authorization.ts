import LogIn from './LogIn';

const logUrl = 'http://127.0.0.1:5000/api/login';

function authorization(parent: HTMLElement) {
  const loginHandler = new LogIn(logUrl);
  loginHandler.renderLoginForm(parent);

  const nameInput = document.querySelector('#nickName') as HTMLInputElement;
  const passwordInput = document.querySelector('#password') as HTMLInputElement;
  const errorGeneral = document.querySelector('#errorGeneral') as HTMLDivElement;
  const errorName = document.querySelector('#errorNameLog') as HTMLDivElement;
  const errorPassword = document.querySelector('#passwordError') as HTMLDivElement;
  const loginButton = document.querySelector('#loginButton') as HTMLButtonElement;
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
    const response = await loginHandler.getLogData(nameInput.value, passwordInput.value);
    console.log(response);
    if (response && response.data) {
      loginHandler.renderPasswordNameError(response.data, errorGeneral);
      errorGeneral.classList.remove('form_hidden');
    } else if (response && response[0].nickName) {
      if (errorGeneral.classList.contains('form_hidden')) {
        errorGeneral.classList.add('form_hidden');
      }
      console.log(response);
    }
  });

  // return currentUser;
}

export default authorization;
