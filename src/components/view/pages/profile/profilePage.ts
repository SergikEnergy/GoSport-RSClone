import { createElement } from './../../template/createElement';
import Page from '../../template/page';
import { IGetUser } from '../../authorization/authorization.types';
import HandlerPhoto from './addPhoto/handlerPhoto';

const userId = localStorage.getItem('currentUserId');
const urlToBase = `https://go-sport-app-clone.onrender.com/api/profiles`;

export default class ProfilePage extends Page {
  static textObject = {
    MainTitle: 'ProfilePage',
  };

  constructor(id: string) {
    super(id);
  }

  render() {
    this.renderAfterDate();
    return this.container;
  }

  async renderAfterDate() {
    try {
      const centerContainer = createElement('div', this.container, 'center');
      const loaderPhoto = createElement('div', centerContainer, 'loader');
      const photoHandler = new HandlerPhoto(loaderPhoto);
      photoHandler.renderPhoto();
      if (userId) {
        const data = await this.getCurrentUserInfo(urlToBase, userId);

        if (data && data.personalData) {
          const contentBlock = createElement('div', centerContainer, 'content');
          const nickUser = createElement('h1', contentBlock, 'content-nick');
          nickUser.innerHTML = `Логин: <span class="nickName_inner">${data.nickName}</span>`;
          const nameUser = createElement('h2', contentBlock, 'content-firstName');
          nameUser.innerHTML = `Имя пользователя: <span class="name_inner">${data.personalData.first_name}</span>`;
          const lastNameUser = createElement('h2', contentBlock, 'content-lastName');
          lastNameUser.innerHTML = `Фамилия пользователя: <span class="lastName_inner">${data.personalData.last_name}</span>`;
          const preferGames = createElement('p', contentBlock, 'content-games');
          const titlePreferGames = createElement('div', preferGames, 'content-games_title');
          const wrapperGamesItem = createElement('div', preferGames, 'content-games_container');
          titlePreferGames.innerText = 'Предпочитаемые игры';
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
}

/*uploadPhoto({
  accept: ['.png', '.jpg', '.jpeg', '.gif', '.svg'],
});*/
