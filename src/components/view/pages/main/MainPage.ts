import { createElement } from '../../template/createElement';
import Page from '../../template/page';
import { fetchEvents } from './mainQueryDB';
import { IEvent } from '../events/eventsType';
import SelectionLang from '../translation/lang-selection';
import { IData } from '../translation/dataType';

export default class MainPage extends Page {
  chooseLangComponent!: SelectionLang;
  chooseLang!: number;
  wordsArr!: IData[];
  wordsChooseArr!: IData;
  static textObject = {
    MainTitle: 'Welcome to Main Page',
  };

  private eventsUrl: URL = new URL('events/three', 'https://go-sport-app-clone.onrender.com/api/');

  constructor(id: string) {
    super(id);
  }

  render() {
    this.getData();


    const sectionHero = createElement('section', this.container, 'hero position-relative');
    const containerHero = createElement('div', sectionHero, 'container-fluid h-100');
    const rowHero = createElement('div', containerHero, 'row');
    const colHero1 = createElement('div', rowHero, 'col-md-5 col-xl-4 offset-xl-1');
    const colHero2 = createElement('div', rowHero, 'col-md-7 px-0 h-100');

    const heroDescr1 = createElement('div', colHero1, 'hero__desription');
    const h1One = createElement('h1', heroDescr1, '');
    h1One.innerHTML = `${this.wordsChooseArr.first_section_text}`;
    const article1 = createElement('article', heroDescr1, 'games-list');

    article1.addEventListener('click', (e: Event) => {
      if (e.target instanceof HTMLElement) {
        window.localStorage.setItem('kindSport', `${e.target.dataset.event}`);
      }
    });

    const linkVolley = createElement('a', article1, 'games-list__item games-list__item-volleyball');
    this.changeLink(linkVolley);
    linkVolley.setAttribute('data-event', 'Volleyball');
    const figureVolley = createElement('figure', linkVolley, '');
    figureVolley.setAttribute('data-event', 'Volleyball');
    const imgVolley = createElement('img', figureVolley, '');
    imgVolley.setAttribute('src', '/icons/volleyball.png');
    imgVolley.setAttribute('alt', 'Volleyball image');
    imgVolley.setAttribute('data-event', `${this.wordsChooseArr.volleyball}`);
    const figCaptVolley = createElement('figcaption', figureVolley, '');
    figCaptVolley.innerText = `${this.wordsChooseArr.volleyball[0].toUpperCase() + this.wordsChooseArr.volleyball.slice(1)}`;
    figCaptVolley.setAttribute('data-event', 'Volleyball');

    const linkFoot = createElement('a', article1, 'games-list__item games-list__item-football');
    this.changeLink(linkFoot);
    linkFoot.setAttribute('data-event', 'Football');
    const figureFoot = createElement('figure', linkFoot, '');
    figureFoot.setAttribute('data-event', 'Football');
    const imgFoot = createElement('img', figureFoot, '');
    imgFoot.setAttribute('src', '/icons/football.png');
    imgFoot.setAttribute('alt', 'Football image');
    imgFoot.setAttribute('data-event', `${this.wordsChooseArr.football}`);
    const figCaptFoot = createElement('figcaption', figureFoot, '');
    figCaptFoot.innerText = `${this.wordsChooseArr.football[0].toUpperCase() + this.wordsChooseArr.football.slice(1)}`;
    figCaptFoot.setAttribute('data-event', 'Football');

    const linkBasket = createElement('a', article1, 'games-list__item games-list__item-basketball');
    this.changeLink(linkBasket);
    linkBasket.setAttribute('data-event', 'Basketball');
    const figureBasket = createElement('figure', linkBasket, '');
    figureBasket.setAttribute('data-event', 'Basketball');
    const imgBasket = createElement('img', figureBasket, '');
    imgBasket.setAttribute('src', '/icons/basketball-ball.png');
    imgBasket.setAttribute('alt', 'Basketball image');
    imgBasket.setAttribute('data-event', `${this.wordsChooseArr.basketball}`);
    const figCaptBasket = createElement('figcaption', figureBasket, '');
    figCaptBasket.innerText = `${this.wordsChooseArr.basketball[0].toUpperCase() + this.wordsChooseArr.basketball.slice(1)}`;
    figCaptBasket.setAttribute('data-event', 'Basketball');

    const linkTennis = createElement('a', article1, 'games-list__item games-list__item-more-games');
    this.changeLink(linkTennis);
    linkTennis.setAttribute('data-event', 'Tennis');
    const figureTennis = createElement('figure', linkTennis, '');
    figureTennis.setAttribute('data-event', 'Tennis');
    const imgTennis = createElement('img', figureTennis, '');
    imgTennis.setAttribute('src', '/icons/more-icon.svg');
    imgTennis.setAttribute('alt', 'Other games');
    imgTennis.setAttribute('data-event', `${this.wordsChooseArr.tennis}`);
    const figCaptTennis = createElement('figcaption', figureTennis, '');
    figCaptTennis.innerText = `${this.wordsChooseArr.else_games[0].toUpperCase() + this.wordsChooseArr.else_games.slice(1)}`;
    figCaptTennis.setAttribute('data-event', 'Tennis');

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

    //Carousel switch's


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
            kindSportStr = `${this.wordsChooseArr.football}`;
            break;
          case 'basketball':
            kindSportStr = `${this.wordsChooseArr.basketball}`;
            break;
          case 'volleyball':
            kindSportStr = `${this.wordsChooseArr.volleyball}`;
            break;
          case 'tennis':
            kindSportStr = `${this.wordsChooseArr.tennis}`;
            break;
        }

        const card = createElement('div', cardsBlock, 'cards_events__item');
        const cardKind = createElement('h3', card, 'cards_events__item-kind');

        cardKind.innerText = `${kindSportStr}`;
        const cardDate = createElement('div', card, 'cards_events__item-date');
        cardDate.innerText = `${this.wordsChooseArr.date}: ${eventsAll[i].date}`;
        const timeBlock = createElement('div', card, 'cards_events__item-time time_block');

        const timeStart = createElement('div', timeBlock, 'time_block-start');
        timeStart.innerText = `${this.wordsChooseArr.begin_time}: ${eventsAll[i].time_start}`;

        const timeEnd = createElement('div', timeBlock, 'time_block-end');
        timeEnd.innerText = `${this.wordsChooseArr.end_time}: ${eventsAll[i].time_end}`;
      }
    }

    const linkEvents = createElement('a', linkEventsBlock, 'main_page__link');
    this.changeLink(linkEvents);
    linkEvents.innerText = `${this.wordsChooseArr.button_on_all_game}`;
    this.eventsAfterRenderMainPage();
  }

  removeActiveClass(element: Element): void {
    element.classList.remove('active');
  }

  addActiveClass(element: Element): void {
    element.classList.add('active');
  }

  eventsAfterRenderMainPage(): void {
    const carouselContainerElem = document.getElementById('carouselMain') as HTMLElement;
    const carouselImageContainerElem = document.querySelectorAll('.carousel-item');
    const carouselItemElem = document.querySelectorAll('.carousel__indicators-item');

    //Carousel switch's

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
    // linksBall.forEach((link) => {
    //   link.addEventListener('click', (e) => {
    //     e.preventDefault();
    //     console.log(e);
    //   });
    // });
    gamesListContainerElem?.addEventListener('click', (event) => {

      linksBall.forEach((elem) => {
        if (event.target === elem) {
          console.log(elem, elem.getAttribute('data-event')?.toLowerCase());
        }
      });
    });
  }

  saveToLocalStorage(kindGames: string): void {
    if (kindGames) localStorage.setItem('selected_kind', `${kindGames}`);
  }

  getData() {
    this.chooseLangComponent = new SelectionLang();
    this.wordsArr = this.chooseLangComponent.dataArr;
    this.chooseLang = this.chooseLangComponent.determinationLanguage();
    this.wordsChooseArr = this.wordsArr[this.chooseLang];
  }

  changeLink(el: HTMLElement) {
    const lang = localStorage.getItem('lang');

    if (lang === '0') {
      el.setAttribute('href', '#events-page-ru');
    } else {
      el.setAttribute('href', '#events-page-en');
    }
  }
}
