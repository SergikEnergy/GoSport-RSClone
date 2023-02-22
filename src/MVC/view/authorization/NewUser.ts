import { createElement } from '../template/createElement';
import LogIn from './LogIn';
import { ICreateUser, IValidateCreate } from './authorization.types';

export default class NewUser extends LogIn {
  renderForm(parent: HTMLElement): void {
    const wrapperSignUp = createElement('div', parent, 'form-wrapper wrapper_signup');

    const formCreate = createElement('form', wrapperSignUp, 'create-form');
    formCreate.setAttribute('action', '#');
    formCreate.setAttribute('id', 'createAccount');

    const createTitle = createElement('h2', formCreate, 'create-form__title');
    createTitle.textContent = 'Create account';

    const createFormMessage = createElement('div', formCreate, 'create-form__message create-form__message_error form_hidden');
    createFormMessage.setAttribute('id', 'errorGeneralCreate');
    createFormMessage.textContent = 'Incorrect dates in form. Check data, please';

    const inputGroupName = createElement('div', formCreate, 'create-form__input-group');
    const inputName = createElement('input', inputGroupName, 'create-form__input');
    inputName.setAttribute('placeholder', 'Input user name');
    inputName.setAttribute('id', 'nickNameNew');
    inputName.setAttribute('type', 'text');
    inputName.setAttribute('autofocus', 'true');
    inputName.setAttribute('required', 'true');
    const errorName = createElement('div', inputGroupName, 'create-form__input-error-message');
    errorName.classList.add('form_hidden');
    errorName.setAttribute('id', 'errorNameNewLog');
    errorName.textContent = 'Incorrect nick name';

    const inputGroupPassword = createElement('div', formCreate, 'create-form__input-group');
    const inputPassword = createElement('input', inputGroupPassword, 'create-form__input');
    inputPassword.setAttribute('placeholder', 'Input password');
    inputPassword.setAttribute('id', 'passwordNew');
    inputPassword.setAttribute('type', 'password');
    inputPassword.setAttribute('required', 'true');
    const errorPassword = createElement('div', inputGroupPassword, 'create-form__input-error-message form_hidden');
    errorPassword.setAttribute('id', 'passwordErrorNew');
    errorPassword.textContent = 'Incorrect password';

    const inputGroupPasswordTwo = createElement('div', formCreate, 'create-form__input-group');
    const inputPasswordTwo = createElement('input', inputGroupPasswordTwo, 'create-form__input');
    inputPasswordTwo.setAttribute('placeholder', 'Confirm your password');
    inputPasswordTwo.setAttribute('id', 'passwordNewRepeat');
    inputPasswordTwo.setAttribute('type', 'password');
    inputPasswordTwo.setAttribute('required', 'true');
    const errorPasswordTwo = createElement('div', inputGroupPasswordTwo, 'create-form__input-error-message form_hidden');
    errorPasswordTwo.setAttribute('id', 'passwordErrorNewTwo');
    errorPasswordTwo.textContent = 'Passwords not match';

    const inputGroupFirstName = createElement('div', formCreate, 'create-form__input-group nonrequired-field');
    const inputFirstName = createElement('input', inputGroupFirstName, 'create-form__input');
    inputFirstName.setAttribute('placeholder', 'Input your first name');
    inputFirstName.setAttribute('id', 'firstName');
    inputFirstName.setAttribute('type', 'text');

    const inputGroupLastName = createElement('div', formCreate, 'create-form__input-group nonrequired-field');
    const inputLastName = createElement('input', inputGroupLastName, 'create-form__input');
    inputLastName.setAttribute('placeholder', 'Input your last name');
    inputLastName.setAttribute('id', 'lastName');
    inputLastName.setAttribute('type', 'text');

    const inputGroupCoach = createElement('div', formCreate, 'create-form__input-group checkbox-group');
    const inputCoach = createElement('input', inputGroupCoach, 'create-form__input input-checkbox');
    const labelCoach = createElement('label', inputGroupCoach);
    labelCoach.setAttribute('for', 'coach');
    labelCoach.textContent = `check this, if you're a coach`;
    inputCoach.setAttribute('id', 'coach');
    inputCoach.setAttribute('value', 'coach');
    inputCoach.setAttribute('name', 'coach');
    inputCoach.setAttribute('type', 'checkbox');

    const inputGroupPlayer = createElement('div', formCreate, 'create-form__input-group checkbox-group');
    const inputPlayer = createElement('input', inputGroupPlayer, 'create-form__input input-checkbox');
    const labelPlayer = createElement('label', inputGroupPlayer);
    labelPlayer.setAttribute('for', 'player');
    labelPlayer.textContent = `check this, if you're a player`;
    inputPlayer.setAttribute('id', 'player');
    inputPlayer.setAttribute('type', 'checkbox');

    const inputGroupGames = createElement('div', formCreate, 'create-form__input-group checkbox-group checkbox-group_games');
    const selectGameText = createElement('p', inputGroupGames, 'games__title');
    selectGameText.textContent = `Select games which you'll play in: `;

    const subGroupOne = createElement('div', inputGroupGames, 'subGroup group_one');
    const subGroupTwo = createElement('div', inputGroupGames, 'subGroup group_two');
    const inputBasket = createElement('input', subGroupOne, 'create-form__input input-checkbox');
    const labelBasket = createElement('label', subGroupOne, 'label_games');
    labelBasket.setAttribute('for', 'basket');
    labelBasket.textContent = `basketball`;
    inputBasket.setAttribute('id', 'basket');
    inputBasket.setAttribute('value', 'basket');
    inputBasket.setAttribute('name', 'selectGames');
    inputBasket.setAttribute('type', 'checkbox');

    const inputTennis = createElement('input', subGroupOne, 'create-form__input input-checkbox');
    const labelTennis = createElement('label', subGroupOne, 'label_games');
    labelTennis.setAttribute('for', 'tennis');
    labelTennis.textContent = `tennis`;
    inputTennis.setAttribute('id', 'tennis');
    inputTennis.setAttribute('value', 'tennis');
    inputTennis.setAttribute('name', 'selectGames');
    inputTennis.setAttribute('type', 'checkbox');

    const inputFootball = createElement('input', subGroupTwo, 'create-form__input input-checkbox');
    const labelFootball = createElement('label', subGroupTwo, 'label_games');
    labelFootball.setAttribute('for', 'football');
    labelFootball.textContent = `football`;
    inputFootball.setAttribute('id', 'football');
    inputFootball.setAttribute('value', 'football');
    inputFootball.setAttribute('name', 'selectGames');
    inputFootball.setAttribute('type', 'checkbox');

    const inputVolley = createElement('input', subGroupTwo, 'create-form__input input-checkbox');
    const labelVolley = createElement('label', subGroupTwo, 'label_games');
    labelVolley.setAttribute('for', 'volley');
    labelVolley.textContent = `volleyball`;
    inputVolley.setAttribute('id', 'volley');
    inputVolley.setAttribute('value', 'volley');
    inputVolley.setAttribute('name', 'selectGames');
    inputVolley.setAttribute('type', 'checkbox');

    const notes = createElement('div', formCreate, 'form_notes');
    notes.innerHTML = `<span class="notes_symbol">*</span>  fields are not required`;

    const createButton = createElement('button', formCreate, 'form__button');
    createButton.setAttribute('id', 'createButton');
    createButton.setAttribute('type', 'submit');
    createButton.textContent = 'Create new user';

    const redirectCreate = createElement('p', formCreate, 'form__text');
    const redirectCreateLink = createElement('a', redirectCreate, 'form__link');
    redirectCreateLink.setAttribute('id', 'linkLogIn');
    redirectCreateLink.setAttribute('href', './');
    redirectCreateLink.textContent = `Already have an account? Log into account`;
  }

  comparePassword(password: string, passwordTwo: string): boolean {
    return password === passwordTwo;
  }

  checkEmptyFields(user: IValidateCreate): boolean {
    const arr = Object.values(user);
    if (arr.includes(false)) return false;
    return true;
  }

  async createUser(userRare: ICreateUser) {
    try {
      //create ful user body
      const user = {
        coach: userRare.coach,
        nickName: userRare.nickName,
        password: userRare.password,
        player: userRare.player,
        events: [],
        personalData: {
          first_name: userRare.firstName,
          last_name: userRare.lastName,
          games: userRare.games,
        },
        avatar: 'defaultAvatar.png',
      };

      const newUser = await fetch(`${this.url}`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      });
      const data = await newUser.json();
      return data;
    } catch (err) {
      return {
        error: err,
        message: 'error by creating user',
      };
    }
  }
}
