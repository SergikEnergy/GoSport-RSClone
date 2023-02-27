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
        }
      }
    } catch (err) {
      console.log(err);
      return { data: false, message: 'error by getting user info' };
    }
    //     this.container.className = 'container-fluid vh-100';
    //     const wrapper = createElement('div', this.container, 'row d-flex justify-content-center align-items-center h-100');
    //     const wrapper2 = createElement('div', wrapper, 'col col-lg-9 mb-4 mb-lg-0');
    //     const card = createElement('div', wrapper2, 'card mb-3 body');
    //     card.style.borderRadius = `.5rem;`;
    //     const cardWrapper = createElement('div', card, 'row g-0');
    //     const cardImageWrapper = createElement(
    //       'div',
    //       cardWrapper,
    //       'd-flex justify-content-center align-items-center flex-column col-md-4 gradient-custom text-center text-white'
    //     );
    //     cardImageWrapper.innerHTML = `<img src="/img/user.png"
    //   alt="Avatar" class="img-fluid my-5" style="width: 80px;object-fit:contain;aspect-ratio:4/3;" />
    // <h5 class="fs-1">Nickname</h5>`;
    //     const cardWrapper2 = createElement('div', cardWrapper, 'col-md-8');
    //     cardWrapper2.innerHTML = `
    // <div class="card-body p-4">
    // <h6 class="fs-1 text-center">Информация</h6>
    // <hr class="mt-0 mb-4">
    // <div class="row pt-1">
    //   <div class="col-4 mb-3">
    //   <h6 class="fs-2">Выбранные игры:</h6>
    //   <p class="">Футбол, теннис</p>
    //   </div>
    //   <div class="col-4 mb-3">
    //   <h6 class="fs-2">Имя, фамилия:</h6>
    //   <p class="">Игрок, игроков</p>
    //   </div>
    //   <div class="col-4 mb-3">
    //   <h6 class="fs-2">Выбранные роли:</h6>
    //   <p class="">Игрок</p>
    //   </div>
    // </div>
    // <h6 class="fs-2">Прошедшие игры</h6>
    // <hr class="mt-0 mb-4">
    // <div class="row pt-1">
    //   <div class="col-6 mb-3">
    //     <h6 class="fs-2">Дата:</h6>
    //     <p class="">23.02.2022</p>
    //   </div>
    //   <div class="col-6 mb-3">
    //     <h6 class="fs-2">В качестве:</h6>
    //     <p class="">Игрока</p>
    //     <h6 class="fs-2">Игра в:</h6>
    //     <p class="">Теннис</p>
    //   </div>
    // </div>`;
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
