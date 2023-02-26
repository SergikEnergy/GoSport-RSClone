import { createElement } from '../../template/createElement';
import { IEvent, KindsSport } from './eventsType';

const url = 'http://localhost:5000/api/events';
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
      renderEvents(blockEvents, data, wrapper, valuePlayers);
    } else {
      blockEvents.innerHTML = '';
      const textMessage = createElement('div', blockEvents, 'message-text');
      textMessage.textContent = 'По данным фильтрам - событий не найдено! Измениете параметры фильтров для поиска похожих или других событий';
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
  const correctDate = date.value.split('-').reverse().join('.');
  const typeSport = `${kindSport.textContent}`;
  const kind = KindsSport[typeSport as keyof typeof KindsSport];

  const res = await fetch(`${url}`, {
    headers: {
      kind: `${kind}`,
      dateevent: `${correctDate}`,
      restplayers: `${valuePlayers?.value}`,
    },
  });

  const data: IEvent[] = await res.json();
  return data;
}

function renderEvents(parent: HTMLElement, data: IEvent[], firstParent: HTMLElement, valuePlayers: HTMLInputElement): void {
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

    eventButton.addEventListener('click', async () => {
      const dataEvent = await getEvent(item._id);

      if (dataEvent) {
        renderEvent(firstParent, dataEvent, valuePlayers);
        document.body.classList.add('off-scroll');
      }
    });
  });
}

async function getEvent(id: string): Promise<IEvent> {
  const res = await fetch(`${url}/${id}`);
  const data: IEvent = await res.json();
  return data;
}

function renderEvent(parent: HTMLElement, data: IEvent, valuePlayers?: HTMLInputElement):void {
  const blackoutPopup = createElement('div', parent, 'blackout-popup');
  const eventPopup = createElement('div', blackoutPopup, 'event-popup');
  const nameGame = createElement('p', eventPopup, 'event-popup__name');
  nameGame.textContent = `${data.kind.toLocaleUpperCase()}`;
  const dateGame = createElement('p', eventPopup, 'event-popup__date');
  dateGame.textContent = `День проведения:  ${data.date}`;
  const placeName = createElement('p', eventPopup, 'event-popup__place');
  placeName.textContent = `Место проведения: ${data.place_name}`;
  const gameStart = createElement('p', eventPopup, 'event-popup__time');
  gameStart.textContent = `Время проведения: ${data.time_start} - ${data.time_end}`;
  const freePlaces = createElement('p', eventPopup, 'event-popup__free-places');
  freePlaces.textContent = `Свободных мест: ${data.rest_players}`;
  const button = createElement('button', eventPopup, 'button_add');
  button.textContent = 'Присоединиться';

  button.addEventListener('click', async () => {
    const newData = structuredClone(data);
    const idPlayer = localStorage.getItem('currentUserId');

    if (!idPlayer) {
      console.log(`id not found`);
      return;
    }

    if (newData.players.includes(idPlayer)) {
      const message = 'Вы уже состоите в данном мероприятии!'
      renderMessage(eventPopup, message);
    } else if (!valuePlayers?.value) {
      const message = 'Вы не указали в фильтре сколько человек хочет присоединиться к данному мероприятию!';
      renderMessage(eventPopup, message);
    } else if (newData.rest_players < Number(valuePlayers.value)){
      const message = 'Недостаточно свободных мест на данном мероприятии!';
      renderMessage(eventPopup, message)
    } else {
      newData.players.push(idPlayer);
      newData.rest_players -= Number(`${valuePlayers?.value}`);

      const req = await addPlayerInEvent(data._id, newData);

      if (req) {
        const errorMessage = 'Вы успешно добавлены на мероприятие!';
        renderMessage(eventPopup, errorMessage);
      }
    }

  });

  blackoutPopup.addEventListener('click', (e: Event) => {
    if (e.target instanceof HTMLElement) {
      if (!e.target.closest('.event-popup')) {
        setTimeout((): void => {
          blackoutPopup.remove();
        }, 1000);
        document.body.classList.remove('off-scroll');
        blackoutPopup.classList.add('close');
      }
    }
  });
}

async function addPlayerInEvent(id: string, data: IEvent) {
  const request = await fetch(`${url}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    },
  });

  return request;
}

function renderMessage(parent: HTMLElement, text: string): void {
  const message = createElement('div', parent, 'message-notice');
  message.textContent = `${text}`;

  setTimeout((): void => {
    message.remove();
  }, 2000);
}