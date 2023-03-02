import { createElement } from './../../template/createElement';
import Page from '../../template/page';
import { IGetUser } from '../../authorization/authorization.types';
import HandlerPhoto from './addPhoto/handlerPhoto';
import SelectionLang from '../translation/lang-selection';
import { IData } from '../translation/dataType';

const userId = localStorage.getItem('currentUserId');
const urlToBase = `https://go-sport-app-clone.onrender.com/api/profiles`;

export default class ProfilePage extends Page {
  chooseLangComponent!: SelectionLang;
  chooseLang!: number;
  wordsArr!: IData[];
  wordsChooseArr!: IData;

  static textObject = {
    MainTitle: 'ProfilePage',
  };

  constructor(id: string) {
    super(id);
  }

  render() {
    this.getData();
    this.renderAfterDate();
    return this.container;
  }

  async renderAfterDate() {
    try {
      const wrapperElement = createElement('div', this.container, 'wrapper_profile');
      const centerContainer = createElement('div', wrapperElement, 'center');
      const loaderPhoto = createElement('div', centerContainer, 'loader');
      const photoHandler = new HandlerPhoto(loaderPhoto);
      const goHomeButton = createElement('div', wrapperElement, 'profile_home');
      goHomeButton.innerHTML = `<a class = "error-page_link" href="#main-page">${this.wordsChooseArr.button_on_main_page}</a>`;

      if (userId) {
        const data = await this.getCurrentUserInfo(urlToBase, userId);

        if (data && data.personalData) {
          photoHandler.renderPhoto(data.avatar);
          const contentBlock = createElement('div', centerContainer, 'content_profile');
          const nickUser = createElement('h1', contentBlock, 'content-nick');
          nickUser.innerHTML = `${this.wordsChooseArr.authorization_login}: <span class="nickName_inner">${data.nickName}</span>`;
          const nameUser = createElement('h2', contentBlock, 'content-firstName');
          nameUser.innerHTML = `${this.wordsChooseArr.user_name}: <span class="name_inner">${data.personalData.first_name}</span>`;
          const lastNameUser = createElement('h2', contentBlock, 'content-lastName');
          lastNameUser.innerHTML = `${this.wordsChooseArr.user_lastname}: <span class="lastName_inner">${data.personalData.last_name}</span>`;
          const preferGames = createElement('p', contentBlock, 'content-games');
          const titlePreferGames = createElement('div', preferGames, 'content-games_title');
          const wrapperGamesItem = createElement('div', preferGames, 'content-games_container');
          titlePreferGames.innerText = `${this.wordsChooseArr.user_games}:`;
          for (let i = 0; i < data.personalData.games.length; i += 1) {
            const preferGamesFoot = createElement('span', wrapperGamesItem, 'content-games_item');
            preferGamesFoot.innerText = `${data.personalData.games[i]}`;
          }
          photoHandler.uploadPhoto(
            {
              accept: ['.png', '.jpg', '.jpeg', '.gif', '.svg'],
            },
            data
          );
        }
      }
    } catch (err) {
      console.log(err);
      return { data: false, message: 'error by getting user info' };
    }
  }

  async getCurrentUserInfo(url: string, id: string): Promise<IGetUser | void> {
    try {
      const currentUser = await fetch(`${url}/${id}`);
      const data: IGetUser = await currentUser.json();
      return data;
    } catch (err) {
      console.log({ error: 'error by getting user', data: false });
    }
  }

  getData() {
    this.chooseLangComponent = new SelectionLang();
    this.wordsArr = this.chooseLangComponent.dataArr;
    this.chooseLang = this.chooseLangComponent.determinationLanguage();
    this.wordsChooseArr = this.wordsArr[this.chooseLang];
  }
}

/*uploadPhoto({
  accept: ['.png', '.jpg', '.jpeg', '.gif', '.svg'],
});*/
