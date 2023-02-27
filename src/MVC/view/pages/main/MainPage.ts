import { createElement } from '../../template/createElement';
import Page from '../../template/page';
import { fetchEvents } from './mainQueryDB';
import { IEvent } from '../events/eventsType';

export default class MainPage extends Page {
  static textObject = {
    MainTitle: 'Welcome to Main Page',
  };

  private eventsUrl: URL = new URL('events/three', 'https://go-sport-app-clone.onrender.com/api/');

  constructor(id: string) {
    super(id);
  }

  render() {
    const sectionHero = createElement('section', this.container, 'hero position-relative');
    const containerHero = createElement('div', sectionHero, 'container-fluid h-100');
    const rowHero = createElement('div', containerHero, 'row');
    const colHero1 = createElement('div', rowHero, 'col-md-5 col-xl-4 offset-xl-1');
    const colHero2 = createElement('div', rowHero, 'col-md-7 px-0 h-100');

    const heroDescr1 = createElement('div', colHero1, 'hero__desription');
    const h1One = createElement('h1', heroDescr1, '');
    h1One.innerHTML = `Играй, тренируйся <br>
		и улучшай свои навыки <br>
		в командных видах спортах`;
    const article1 = createElement('article', heroDescr1, 'games-list');
    const link1_1 = createElement('a', article1, 'games-list__item games-list__item-volleyball');
    link1_1.setAttribute('href', '#events-page');
    link1_1.setAttribute('data-event', 'Volleyball');
    const figure1_1 = createElement('figure', link1_1, '');
    figure1_1.setAttribute('data-event', 'Volleyball');
    const img1_1 = createElement('img', figure1_1, '');
    img1_1.setAttribute('src', '/icons/volleyball.png');
    img1_1.setAttribute('alt', 'Volleyball image');
    img1_1.setAttribute('data-event', 'Volleyball');
    const figCapt1_1 = createElement('figcaption', figure1_1, '');
    figCapt1_1.innerText = 'Воллейбол';
    figCapt1_1.setAttribute('data-event', 'Volleyball');

    const link1_2 = createElement('a', article1, 'games-list__item games-list__item-football');
    link1_2.setAttribute('href', '#events-page');
    link1_2.setAttribute('data-event', 'Football');
    const figure1_2 = createElement('figure', link1_2, '');
    figure1_2.setAttribute('data-event', 'Football');
    const img1_2 = createElement('img', figure1_2, '');
    img1_2.setAttribute('src', '/icons/football.png');
    img1_2.setAttribute('alt', 'Football image');
    img1_2.setAttribute('data-event', 'Football');
    const figCapt1_2 = createElement('figcaption', figure1_2, '');
    figCapt1_2.innerText = 'Футбол';
    figCapt1_2.setAttribute('data-event', 'Football');

    const link1_3 = createElement('a', article1, 'games-list__item games-list__item-basketball');
    link1_3.setAttribute('href', '#events-page');
    link1_3.setAttribute('data-event', 'Basketball');
    const figure1_3 = createElement('figure', link1_3, '');
    figure1_3.setAttribute('data-event', 'Basketball');
    const img1_3 = createElement('img', figure1_3, '');
    img1_3.setAttribute('src', '/icons/basketball-ball.png');
    img1_3.setAttribute('alt', 'Basketball image');
    img1_3.setAttribute('data-event', 'Basketball');
    const figCapt1_3 = createElement('figcaption', figure1_3, '');
    figCapt1_3.innerText = 'Баскетбол';
    figCapt1_3.setAttribute('data-event', 'Basketball');

    const link1_4 = createElement('a', article1, 'games-list__item games-list__item-more-games');
    link1_4.setAttribute('href', '#events-page');
    link1_4.setAttribute('data-event', 'Tennis');
    const figure1_4 = createElement('figure', link1_4, '');
    figure1_1.setAttribute('data-event', 'Tennis');
    const img1_4 = createElement('img', figure1_4, '');
    img1_4.setAttribute('src', '/icons/more-icon.svg');
    img1_4.setAttribute('alt', 'Voleyball image');
    img1_4.setAttribute('data-event', 'Tennis');
    const figCapt1_4 = createElement('figcaption', figure1_4, '');
    figCapt1_4.innerText = 'Ещё игры';
    figCapt1_4.setAttribute('data-event', 'Tennis');

    const heroImages = createElement('div', colHero2, 'hero__images h-100');
    const carouselHero = createElement('div', heroImages, 'carousel slide carousel-fade');
    carouselHero.id = 'carousel';
    const carouselOl = createElement('ol', carouselHero, 'carousel-indicators carousel__indicators-custom');
    carouselOl.id = 'carouselMain';

    for (let i = 0; i < 3; i += 1) {
      const liHero = createElement('li', carouselOl, 'carousel__indicators-item');
      if (i === 0) {
        liHero.classList.add('active');
      }
      liHero.setAttribute('data-target', 'carouselIndicators');
      liHero.setAttribute('data-slide-to', `${i}`);
    }
    const innerCarousel = createElement('div', carouselHero, 'carousel-inner');
    for (let i = 0; i < 3; i += 1) {
      const itemCarusel = createElement('div', innerCarousel, 'carousel-item');
      if (i === 0) {
        itemCarusel.classList.add('active');
      }
      const ellipsImgCarousel = createElement('figure', itemCarusel, 'carousel-inner__images');
      const imgSlider = createElement('img', ellipsImgCarousel, '');

      if (i === 0) {
        imgSlider.setAttribute('src', `/img/slider-img.jpg`);
      } else {
        imgSlider.setAttribute('src', `/img/slider-img${i + 1}.jpg`);
      }

      imgSlider.setAttribute('alt', `${i}st slider image`);
    }
    const carouselContainerElem = document.getElementById('carouselMain') as HTMLElement;

    //Carousel switch's

    console.log(carouselContainerElem);
    this.eventsAfterRenderMainPage();
    this.renderRandomEvents(this.container);

    return this.container;
  }

  async renderRandomEvents(parent: HTMLElement): Promise<void> {
    const eventMainPage = createElement('section', parent, 'events-main');
    const wrapper = createElement('div', eventMainPage, 'wrapper_main');
    const eventCardsContainer = createElement('div', wrapper, 'events-main__cards cards_events');
    const linkEventsBlock = createElement('div', wrapper, 'events-main__link');

    const cardsBlock = createElement('div', eventCardsContainer, 'events-main__cards cards_events');

    const eventsAll: [IEvent] | undefined = await fetchEvents(this.eventsUrl);

    if (eventsAll && eventsAll[0].kind) {
      for (let i = 0; i < 3; i++) {
        let kindSportStr = '';
        switch (eventsAll[i].kind) {
          case 'football':
            kindSportStr = 'футбол';
            break;
          case 'basketball':
            kindSportStr = 'баскетбол';
            break;
          case 'volleyball':
            kindSportStr = 'воллейбол';
            break;
          case 'tennis':
            kindSportStr = 'теннис';
            break;
        }

        const card = createElement('div', cardsBlock, 'cards_events__item');
        const cardKind = createElement('h3', card, 'cards_events__item-kind');

        cardKind.innerText = `Матч по ${kindSportStr}у`;
        const cardDate = createElement('div', card, 'cards_events__item-date');
        cardDate.innerText = `Дата: ${eventsAll[i].date}`;
        const timeBlock = createElement('div', card, 'cards_events__item-time time_block');

        const timeStart = createElement('div', timeBlock, 'time_block-start');
        timeStart.innerText = `Начало: ${eventsAll[i].time_start}`;

        const timeEnd = createElement('div', timeBlock, 'time_block-end');
        timeEnd.innerText = `Окончание: ${eventsAll[i].time_end}`;
      }
    }

    const linkEvents = createElement('a', linkEventsBlock, 'main_page__link');
    linkEvents.setAttribute('href', '#events-page');
    linkEvents.innerText = 'Смотреть все игры';
  }

  removeActiveClass(element: Element): void {
    element.classList.remove('active');
  }

  addActiveClass(element: Element): void {
    element.classList.add('active');
  }

  eventsAfterRenderMainPage(): void {
    // console.log(document.querySelector('.carousel-inner'));

    // console.log(document.querySelector('.carousel-item'));
    const carouselContainerElem = document.getElementById('carouselMain') as HTMLElement;
    const carouselImageContainerElem = document.querySelectorAll('.carousel-item');
    const carouselItemElem = document.querySelectorAll('.carousel__indicators-item');

    //Carousel switch's

    // console.log(carouselContainerElem);
    carouselContainerElem?.addEventListener('click', (event) => {
      if (event.target instanceof HTMLLIElement) {
        if (event.target.dataset.target === 'carouselIndicators') {
          const targetDataNumber = event.target.dataset.slideTo;
          carouselImageContainerElem?.forEach((item) => this.removeActiveClass(item));
          if (targetDataNumber) {
            this.addActiveClass(carouselImageContainerElem[+targetDataNumber]);
          }
          carouselItemElem.forEach((item) => this.removeActiveClass(item));
          if (targetDataNumber) {
            this.addActiveClass(carouselItemElem[+targetDataNumber]);
          }
        }
      }
    });
    //Events by click
    const gamesListContainerElem = document.querySelector('.games-list');
    const linksBall = document.querySelectorAll('.games-list__item');
    linksBall.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(e);
      });
    });
    gamesListContainerElem?.addEventListener('click', (event) => {
      console.log(event.target);
      linksBall.forEach((elem) => {
        if (event.target === elem) {
          console.log(elem, elem.getAttribute('data-event')?.toLowerCase());
        }
      });
    });
  }

  saveToLocalStorage(kindGames: string): void {
    if (kindGames) localStorage.setItem('selected_kind', `${kindGames}`);
    // console.log(kindGames);
  }
}
