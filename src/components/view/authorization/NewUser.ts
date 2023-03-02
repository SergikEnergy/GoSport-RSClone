import { createElement } from '../template/createElement';
import LogIn from './logIn';
import { ICreateUser, IValidateCreate } from './authorization.types';
import SelectionLang from '../pages/translation/lang-selection';
import { IData } from '../pages/translation/dataType';

export default class NewUser extends LogIn {
  chooseLangComponent!: SelectionLang;
  chooseLang!: number;
  wordsArr!: IData[];
  wordsChooseArr!: IData;

  renderForm(parent: HTMLElement): void {
    this.getData();

    const wrapperSignUp = createElement('div', parent, 'form-wrapper wrapper_signup');

    const formCreate = createElement('form', wrapperSignUp, 'create-form');
    formCreate.setAttribute('action', '#');
    formCreate.setAttribute('id', 'createAccount');

    const createTitle = createElement('h2', formCreate, 'create-form__title');
    createTitle.textContent = `${this.wordsChooseArr.create_account_header}`;

    const createFormMessage = createElement('div', formCreate, 'create-form__message create-form__message_error form_hidden');
    createFormMessage.setAttribute('id', 'errorGeneralCreate');
    createFormMessage.textContent = `${this.wordsChooseArr.create_account_data_check}`;

    const inputGroupName = createElement('div', formCreate, 'create-form__input-group');
    const inputName = createElement('input', inputGroupName, 'create-form__input');
    inputName.setAttribute('placeholder', `${this.wordsChooseArr.create_account_login_placeholder}`);
    inputName.setAttribute('id', 'nickNameNew');
    inputName.setAttribute('type', 'text');
    inputName.setAttribute('autofocus', 'true');
    inputName.setAttribute('required', 'true');
    const errorName = createElement('div', inputGroupName, 'create-form__input-error-message');
    errorName.classList.add('form_hidden');
    errorName.setAttribute('id', 'errorNameNewLog');
    errorName.textContent = `${this.wordsChooseArr.create_account_login_check}`;

    const inputGroupPassword = createElement('div', formCreate, 'create-form__input-group');
    const inputPassword = createElement('input', inputGroupPassword, 'create-form__input');
    inputPassword.setAttribute('placeholder', `${this.wordsChooseArr.create_account_password_placeholder}`);
    inputPassword.setAttribute('id', 'passwordNew');
    inputPassword.setAttribute('type', 'password');
    inputPassword.setAttribute('required', 'true');
    const errorPassword = createElement('div', inputGroupPassword, 'create-form__input-error-message form_hidden');
    errorPassword.setAttribute('id', 'passwordErrorNew');
    errorPassword.textContent = `${this.wordsChooseArr.create_account_password_check2}`;

    const inputGroupPasswordTwo = createElement('div', formCreate, 'create-form__input-group');
    const inputPasswordTwo = createElement('input', inputGroupPasswordTwo, 'create-form__input');
    inputPasswordTwo.setAttribute('placeholder', `${this.wordsChooseArr.create_account_again_password_placeholder}`);
    inputPasswordTwo.setAttribute('id', 'passwordNewRepeat');
    inputPasswordTwo.setAttribute('type', 'password');
    inputPasswordTwo.setAttribute('required', 'true');
    const errorPasswordTwo = createElement('div', inputGroupPasswordTwo, 'create-form__input-error-message form_hidden');
    errorPasswordTwo.setAttribute('id', 'passwordErrorNewTwo');
    errorPasswordTwo.textContent = `${this.wordsChooseArr.create_account_again_password_check}`;

    const inputGroupFirstName = createElement('div', formCreate, 'create-form__input-group nonrequired-field');
    const inputFirstName = createElement('input', inputGroupFirstName, 'create-form__input');
    inputFirstName.setAttribute('placeholder', `${this.wordsChooseArr.create_account_first_name_placeholder}`);
    inputFirstName.setAttribute('id', 'firstName');
    inputFirstName.setAttribute('type', 'text');

    const inputGroupLastName = createElement('div', formCreate, 'create-form__input-group nonrequired-field');
    const inputLastName = createElement('input', inputGroupLastName, 'create-form__input');
    inputLastName.setAttribute('placeholder', `${this.wordsChooseArr.create_account_last_name_placeholder}`);
    inputLastName.setAttribute('id', 'lastName');
    inputLastName.setAttribute('type', 'text');

    const inputGroupCoach = createElement('div', formCreate, 'create-form__input-group checkbox-group');
    const inputCoach = createElement('input', inputGroupCoach, 'create-form__input input-checkbox');
    const labelCoach = createElement('label', inputGroupCoach);
    labelCoach.setAttribute('for', 'coach');
    labelCoach.textContent = `${this.wordsChooseArr.create_account_check_coach}`;
    inputCoach.setAttribute('id', 'coach');
    inputCoach.setAttribute('value', 'coach');
    inputCoach.setAttribute('name', 'coach');
    inputCoach.setAttribute('type', 'checkbox');

    const inputGroupPlayer = createElement('div', formCreate, 'create-form__input-group checkbox-group');
    const inputPlayer = createElement('input', inputGroupPlayer, 'create-form__input input-checkbox');
    const labelPlayer = createElement('label', inputGroupPlayer);
    labelPlayer.setAttribute('for', 'player');
    labelPlayer.textContent = `${this.wordsChooseArr.create_account_check_player}`;
    inputPlayer.setAttribute('id', 'player');
    inputPlayer.setAttribute('type', 'checkbox');

    const inputGroupGames = createElement('div', formCreate, 'create-form__input-group checkbox-group checkbox-group_games');
    const selectGameText = createElement('p', inputGroupGames, 'games__title');
    selectGameText.textContent = `${this.wordsChooseArr.create_account_select_games}`;

    const subGroupOne = createElement('div', inputGroupGames, 'subGroup group_one');
    const subGroupTwo = createElement('div', inputGroupGames, 'subGroup group_two');
    const inputBasket = createElement('input', subGroupOne, 'create-form__input input-checkbox');
    const labelBasket = createElement('label', subGroupOne, 'label_games');
    labelBasket.setAttribute('for', 'basket');
    labelBasket.textContent = `${this.wordsChooseArr.basketball}`;
    inputBasket.setAttribute('id', 'basket');
    inputBasket.setAttribute('value', 'basket');
    inputBasket.setAttribute('name', 'selectGames');
    inputBasket.setAttribute('type', 'checkbox');

    const inputTennis = createElement('input', subGroupOne, 'create-form__input input-checkbox');
    const labelTennis = createElement('label', subGroupOne, 'label_games');
    labelTennis.setAttribute('for', 'tennis');
    labelTennis.textContent = `${this.wordsChooseArr.tennis}`;
    inputTennis.setAttribute('id', 'tennis');
    inputTennis.setAttribute('value', 'tennis');
    inputTennis.setAttribute('name', 'selectGames');
    inputTennis.setAttribute('type', 'checkbox');

    const inputFootball = createElement('input', subGroupTwo, 'create-form__input input-checkbox');
    const labelFootball = createElement('label', subGroupTwo, 'label_games');
    labelFootball.setAttribute('for', 'football');
    labelFootball.textContent = `${this.wordsChooseArr.football}`;
    inputFootball.setAttribute('id', 'football');
    inputFootball.setAttribute('value', 'football');
    inputFootball.setAttribute('name', 'selectGames');
    inputFootball.setAttribute('type', 'checkbox');

    const inputVolley = createElement('input', subGroupTwo, 'create-form__input input-checkbox');
    const labelVolley = createElement('label', subGroupTwo, 'label_games');
    labelVolley.setAttribute('for', 'volley');
    labelVolley.textContent = `${this.wordsChooseArr.volleyball}`;
    inputVolley.setAttribute('id', 'volley');
    inputVolley.setAttribute('value', 'volley');
    inputVolley.setAttribute('name', 'selectGames');
    inputVolley.setAttribute('type', 'checkbox');

    const notes = createElement('div', formCreate, 'form_notes');
    notes.innerHTML = `<span class="notes_symbol">*</span> ${this.wordsChooseArr.create_account_note}`;

    const createButton = createElement('button', formCreate, 'form__button');
    createButton.setAttribute('id', 'createButton');
    createButton.setAttribute('type', 'submit');
    createButton.textContent = `${this.wordsChooseArr.create_account_button}`;

    const redirectCreate = createElement('p', formCreate, 'form__text');
    const redirectCreateLink = createElement('a', redirectCreate, 'form__link');
    redirectCreateLink.setAttribute('id', 'linkLogIn');
    redirectCreateLink.setAttribute('href', './');
    redirectCreateLink.textContent = `${this.wordsChooseArr.create_account_message}`;
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

  getData() {
    this.chooseLangComponent = new SelectionLang();
    this.wordsArr = this.chooseLangComponent.dataArr;
    this.chooseLang = this.chooseLangComponent.determinationLanguage();
    this.wordsChooseArr = this.wordsArr[this.chooseLang]
  }
}
