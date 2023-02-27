import NewUser from './NewUser';
import { IValidateCreate, ICreateUser } from './authorization.types';

export default function createUser() {
  const linkCreate = 'https://go-sport-app-clone.onrender.com/api/profiles';
  const newUser = new NewUser(linkCreate);
  const parentElement = document.querySelector('.container-forms') as HTMLDivElement;
  newUser.renderForm(parentElement);
  const popUpContainer = document.querySelector('.blackout-popup') as HTMLElement;

  const errorGeneral = document.querySelector('#errorGeneralCreate') as HTMLDivElement;
  const nickInput = document.querySelector('#nickNameNew') as HTMLInputElement;
  const nickError = document.querySelector('#errorNameNewLog') as HTMLDivElement;
  const passwordInput = document.querySelector('#passwordNew') as HTMLInputElement;
  const errorPassword = document.querySelector('#passwordErrorNew') as HTMLDivElement;
  const repeatPassword = document.querySelector('#passwordNewRepeat') as HTMLInputElement;
  const repeatError = document.querySelector('#passwordErrorNewTwo') as HTMLDivElement;
  const firstName = document.querySelector('#firstName') as HTMLInputElement;
  const lastName = document.querySelector('#lastName') as HTMLInputElement;
  const coachCheck = document.querySelector('#coach') as HTMLInputElement;
  const playerCheck = document.querySelector('#player') as HTMLInputElement;
  const basketCheck = document.querySelector('#basket') as HTMLInputElement;
  const volleyCheck = document.querySelector('#volley') as HTMLInputElement;
  const tennisCheck = document.querySelector('#tennis') as HTMLInputElement;
  const footCheck = document.querySelector('#football') as HTMLInputElement;

  const createButton = document.querySelector('#createButton') as HTMLButtonElement;

  const redirectLogIn = document.querySelector('#linkLogIn') as HTMLElement;
  const isValidate: IValidateCreate = {
    checkName: false,
    checkPassLength: false,
    comparePass: false,
  };
  createButton.disabled = true;

  nickInput.addEventListener('blur', () => {
    if (!newUser.checkEmpty(nickInput, nickError)) {
      nickError.classList.remove('form_hidden');
      isValidate.checkName = false;
      nickInput.classList.add('form__input_error');
    } else {
      isValidate.checkName = true;
    }
    if (newUser.checkEmptyFields(isValidate)) createButton.disabled = false;
    else createButton.disabled = true;
  });

  nickInput.addEventListener('input', () => {
    nickError.classList.add('form_hidden');
    nickInput.classList.remove('form__input_error');
    errorGeneral.classList.add('form_hidden');
  });

  passwordInput.addEventListener('blur', () => {
    const length = passwordInput.value.length;

    if (!newUser.checkPasswordLength(length, errorPassword)) {
      errorPassword.classList.remove('form_hidden');
      passwordInput.classList.add('form__input_error');
      isValidate.checkPassLength = false;
    } else {
      isValidate.checkPassLength = true;
    }
    if (newUser.checkEmptyFields(isValidate)) createButton.disabled = false;
    else createButton.disabled = true;
  });

  passwordInput.addEventListener('input', () => {
    errorPassword.classList.add('form_hidden');
    passwordInput.classList.remove('form__input_error');
    if (!errorGeneral.classList.contains('form_hidden')) errorGeneral.classList.add('form_hidden');
  });

  repeatPassword.addEventListener('blur', () => {
    if (!newUser.comparePassword(passwordInput.value, repeatPassword.value)) {
      repeatError.classList.remove('form_hidden');
      repeatPassword.classList.add('form__input_error');
      isValidate.comparePass = false;
    } else {
      isValidate.comparePass = true;
    }
    if (newUser.checkEmptyFields(isValidate)) createButton.disabled = false;
    else createButton.disabled = true;
  });

  repeatPassword.addEventListener('input', () => {
    repeatError.classList.add('form_hidden');
    repeatPassword.classList.remove('form__input_error');
    if (!errorGeneral.classList.contains('form_hidden')) errorGeneral.classList.add('form_hidden');
  });

  coachCheck.addEventListener('click', () => {
    coachCheck.classList.toggle('checked');
  });

  playerCheck.addEventListener('click', () => {
    coachCheck.classList.toggle('checked');
  });

  basketCheck.addEventListener('click', () => {
    basketCheck.classList.toggle('checked');
  });

  tennisCheck.addEventListener('click', () => {
    tennisCheck.classList.toggle('checked');
  });

  footCheck.addEventListener('click', () => {
    footCheck.classList.toggle('checked');
  });

  volleyCheck.addEventListener('click', () => {
    volleyCheck.classList.toggle('checked');
  });

  const containerForms = document.querySelector('.container-forms') as HTMLDivElement;
  redirectLogIn.addEventListener('click', (e) => {
    //here will be animation
    e.preventDefault();
    containerForms.classList.toggle('active-form');
  });

  createButton.addEventListener('click', async (e) => {
    e.preventDefault();

    try {
      const userForm: ICreateUser = {
        nickName: nickInput.value,
        password: passwordInput.value,
        coach: false,
        player: false,
        firstName: '',
        lastName: '',
        games: [],
      };
      const arr: string[] = [];
      if (coachCheck.classList.contains('checked')) userForm.coach = true;
      if (playerCheck.classList.contains('checked')) userForm.player = true;
      if (basketCheck.classList.contains('checked')) arr.push('basketball');
      if (tennisCheck.classList.contains('checked')) arr.push('tennis');
      if (volleyCheck.classList.contains('checked')) arr.push('volleyball');
      if (footCheck.classList.contains('checked')) arr.push('football');
      if (firstName.value.trim()) userForm.firstName = firstName.value.trim();
      if (lastName.value.trim()) userForm.lastName = lastName.value.trim();
      userForm.games = arr;
      debugger;
      const getNewUser = await newUser.createUser(userForm);
      if (getNewUser?.data && getNewUser.data === 'userName') {
        errorGeneral.classList.remove('form_hidden');
        errorGeneral.textContent = `User with such name already exists`;
      } else if (getNewUser && getNewUser.nickName) {
        if (!errorGeneral.classList.contains('form_hidden')) {
          errorGeneral.classList.add('form_hidden');
        }
        newUser.saveLocalStorage(getNewUser._id);
        location.hash = '#' + 'main-page';
        parentElement.classList.add('form_hidden');
        popUpContainer.classList.add('close');
      }
    } catch (err) {
      errorGeneral.classList.remove('form_hidden');
      errorGeneral.textContent = `Ooops! Server is not started.`;
    }
  });
}
