import { createElement } from '../../template/createElement';

const games = ['Волейбол', 'Футбол', 'Баскетбол'];

export const renderPageEvents = (parent: HTMLElement): void => {
  const wrapper = createElement('div', parent, 'wrapper wrapper_events');
  const headerPage = createElement('h2', wrapper, 'header-events');
  headerPage.textContent = 'Список найденных событий на основе выбранных параметров';
  const blockFilters = createElement('div', wrapper, 'filters');
  const headerFilters = createElement('h3', blockFilters, 'filters-header');
  headerFilters.textContent = 'Фильтр';
  const kindSport = createElement('div', blockFilters, 'kind-sport');
  const selectBlock = createElement('div', kindSport, 'kind-sport__select');
  const selectKind = createElement('span', selectBlock, 'kind-sport__selected');
  selectKind.textContent = 'Вид спорта';
  const caret = createElement('div', selectBlock, 'caret');
  const listGames = createElement('ul', kindSport, 'list-games');
  
  const itemsListGames: HTMLElement[] = [];
  games.forEach(item => {
    const el = createElement('li', listGames, 'list-games__item');
    el.textContent = `${item}`;
    itemsListGames.push(el);
  });

  selectBlock.addEventListener('click', () => {
    selectBlock.classList.toggle('kind-sport__select_clicked');
    caret.classList.toggle('caret_rotate');
    listGames.classList.toggle('list-games_active');
  });

  itemsListGames.forEach(element => {
    element.addEventListener('click', (e) => {
      e.stopPropagation();
      selectKind.innerText = element.innerText;
      selectBlock.classList.remove('kind-sport__select_clicked');
      caret.classList.remove('caret_rotate');
      listGames.classList.remove('list-games_active');
      
      itemsListGames.forEach(el => {
        el.classList.remove('list-games_active');
      });
      
      element.classList.add('list-games_active');
    });
  });

  document.addEventListener('click', (e) => {
    if (e.target !== selectBlock && e.target !== selectKind && e.target !== caret) {
      selectBlock.classList.remove('kind-sport__select_clicked');
      caret.classList.remove('caret_rotate');
      listGames.classList.remove('list-games_active');
    }
  });

  const dateEvent = createElement('input', blockFilters, 'date-event');
  dateEvent.setAttribute('type', 'date');

  dateEvent.setAttribute('value', `${getTodayDate()}`);
  const valuePlayers = createElement('input', blockFilters, 'value-players');
  valuePlayers.setAttribute('maxlength', '2');
  valuePlayers.setAttribute('placeholder', 'Количество свободных мест');
  const buttonEvents = createElement('button', blockFilters, 'button_events');
  buttonEvents.textContent = 'Найти';
}

function getTodayDate(): string {
  const todayDate = new Date(Date.now());
  const dateNow = todayDate.getDate();
  const monthNow = todayDate.getMonth() + 1;
  const yearNow = todayDate.getFullYear();
  return `${yearNow}-0${monthNow}-${dateNow}`;
}
