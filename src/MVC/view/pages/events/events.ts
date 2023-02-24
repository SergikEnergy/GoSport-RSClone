import { createElement } from '../../template/createElement';
import { IEvent, KindsSport } from './eventsType';

const games = ['Волейбол', 'Футбол', 'Баскетбол', 'Теннис'];

export const renderPageEvents = (parent: HTMLElement): void => {
  const wrapper = createElement('div', parent, 'wrapper wrapper_events');
  const headerPage = createElement('h2', wrapper, 'header-events');
  headerPage.textContent = 'Список найденных событий на основе выбранных параметров';
  const contentWrapper = createElement('div', wrapper, 'content');
  const blockFilters = createElement('div', contentWrapper, 'filters');
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

  const dateFilters = <HTMLInputElement>createElement('input', blockFilters, 'date-filters');
  dateFilters.setAttribute('type', 'date');

  dateFilters.setAttribute('value', `${getTodayDate()}`);
  const valuePlayers = <HTMLInputElement>createElement('input', blockFilters, 'value-players');
  valuePlayers.setAttribute('maxlength', '2');
  valuePlayers.setAttribute('placeholder', 'Количество свободных мест');
  const buttonFilters = createElement('button', blockFilters, 'button_filters');
  buttonFilters.textContent = 'Найти';
  const blockEvents = createElement('div', contentWrapper, 'block-events');

  buttonFilters.addEventListener('click', async () => {

    const data = await getEvents(selectKind, dateFilters, valuePlayers);

    if (data.length) {
      renderEvents(blockEvents, data);
    }
  });
}

function getTodayDate(): string {
  const todayDate = new Date(Date.now());
  const dateNow = todayDate.getDate();
  const monthNow = todayDate.getMonth() + 1;
  const yearNow = todayDate.getFullYear();
  return `${yearNow}-0${monthNow}-${dateNow}`;
}

async function getEvents(kindSport: HTMLElement, date: HTMLInputElement, valuePlayers: HTMLInputElement): Promise<IEvent[]> {
  const url = 'http://localhost:5000/api/events';
  const correctDate = date.value.split('-').reverse().join('.');
  const typeSport = `${kindSport.textContent}`;
  const kind = KindsSport[typeSport as keyof typeof KindsSport];

  const res = await fetch(`${url}`, {
    headers: {
      kind: `${kind}`,
      date: `${correctDate}`,
      rest_players: `${valuePlayers?.value}`,
    },
  });

  const data: IEvent[] = await res.json();
  return data;
}

function renderEvents(parent: HTMLElement, data: IEvent[]): void {
  parent.innerHTML = '';
  data.forEach(item => {
    const eventBlock = createElement('div', parent, 'event');
    const infoBlock = createElement('div', eventBlock, 'event__info')
    const typeEvent = createElement('p', infoBlock, 'event__type');
    typeEvent.textContent = `${item.kind.toLocaleUpperCase()}`;
    const restPlaces = createElement('p', infoBlock, 'event__places event__item');
    restPlaces.textContent = `Осталось ${item.rest_players} мест`;
    const dateBlock = createElement('div', eventBlock, 'event__date-info');
    const dateEvent = createElement('p', dateBlock, 'event__date event__item');
    dateEvent.textContent = `${item.date}`;
    const timeStart = createElement('p', dateBlock, 'event__time event__item');
    timeStart.textContent = `Начало игры в ${item.time_start}`;
    const eventButton = createElement('button', eventBlock, 'button_event');
    eventButton.textContent = 'Подробнее';
  });
}