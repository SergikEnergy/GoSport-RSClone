import { createElement } from './../../template/createElement';
import Page from '../../template/page';
import './_profile.scss';

export default class ProfilePage extends Page {
  static textObject = {
    MainTitle: 'ProfilePage',
  };

  constructor(id: string) {
    super(id);
  }

  render() {
    this.container.className = 'container-fluid vh-100';
    const wrapper = createElement('div', this.container, 'row d-flex justify-content-center align-items-center h-100');
    const wrapper2 = createElement('div', wrapper, 'col col-lg-9 mb-4 mb-lg-0');
    const card = createElement('div', wrapper2, 'card mb-3 body');
    card.style.borderRadius = `.5rem;`;
    const cardWrapper = createElement('div', card, 'row g-0');
    const cardImageWrapper = createElement(
      'div',
      cardWrapper,
      'd-flex justify-content-center align-items-center flex-column col-md-4 gradient-custom text-center text-white'
    );
    cardImageWrapper.innerHTML = `<img src="/img/user.png"
  alt="Avatar" class="img-fluid my-5" style="width: 80px;object-fit:contain;aspect-ratio:4/3;" />
<h5 class="fs-1">Nickname</h5>`;
    const cardWrapper2 = createElement('div', cardWrapper, 'col-md-8');
    cardWrapper2.innerHTML = `
<div class="card-body p-4">
<h6 class="fs-1 text-center">Информация</h6>
<hr class="mt-0 mb-4">
<div class="row pt-1">
  <div class="col-4 mb-3">
  <h6 class="fs-2">Выбранные игры:</h6>
  <p class="">Футбол, теннис</p>
  </div>
  <div class="col-4 mb-3">
  <h6 class="fs-2">Имя, фамилия:</h6>
  <p class="">Игрок, игроков</p>
  </div>
  <div class="col-4 mb-3">
  <h6 class="fs-2">Выбранные роли:</h6>
  <p class="">Игрок</p>
  </div>
</div>
<h6 class="fs-2">Прошедшие игры</h6>
<hr class="mt-0 mb-4">
<div class="row pt-1">
  <div class="col-6 mb-3">
    <h6 class="fs-2">Дата:</h6>
    <p class="">23.02.2022</p>
  </div>
  <div class="col-6 mb-3">
    <h6 class="fs-2">В качестве:</h6>
    <p class="">Игрока</p>
    <h6 class="fs-2">Игра в:</h6>
    <p class="">Теннис</p>
  </div>
</div>`;
    return this.container;
  }
}
