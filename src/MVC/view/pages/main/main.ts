import './styles/main.css';
import './styles/responsive-main.css';

function mainPage(htmlElem: HTMLElement): string {
  const view = `
  <section class="hero position-relative">
    <div class="container-fluid h-100">
      <div class="row">
        <div class="col-md-5 col-xl-4 offset-xl-1 ">
          <div class="hero__desription">
            <h1>
              Играй, тренируйся <br>
              и улучшай свои навыки <br>
              в командных видах спортах
            </h1>
            <article class="games-list">
            <a href="" class="games-list__item games-list__item-voleyball">
            <figure>
              <img src="/icons/voleyball.png" alt="Voleyball image">
              <figcaption>Волейбол</figcaption>
            </figure>
            </a>
            <a href="" class="games-list__item games-list__item-football">
              <figure>
                <img src="/icons/football.png" alt="Football image">
                <figcaption>Футбол</figcaption>
              </figure>
            </a>
            <a href="" class="games-list__item games-list__item-basketball">
              <figure>
                <img src="/icons/basketball-ball.png" alt="Basketball image">
                <figcaption>Баскетбол</figcaption>
              </figure>
            </a>
            <a href="" class="games-list__item games-list__item-more-games">
              <figure>
                <img src="/icons/more-icon.svg" alt="More games icon">
                <figcaption>Ещё игры</figcaption>
              </figure>
            </a>
            </article>
          </div>
        </div>
        <div class="col-md-7 px-0 h-100">
          <div class="hero__images h-100">
            <div id="carousel" class="carousel slide carousel-fade">
              <ol class="carousel-indicators carousel__indicators-custom">
                <li data-target="carouselIndicators" data-slide-to="0" class="carousel__indicators-item active"></li>
                <li data-target="carouselIndicators" data-slide-to="1" class="carousel__indicators-item"></li>
                <li data-target="carouselIndicators" data-slide-to="2" class="carousel__indicators-item"></li>
              </ol>
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <figure class="carousel-inner__images">
                    <img src="/img/slider-img.jpg" alt="1st slider image">
                  </figure>
                </div>
                <div class="carousel-item">
                  <figure class="carousel-inner__images">
                    <img src="/img/slider-img2.jpg" alt="2nd slider image">
                  </figure>
                </div>
                <div class="carousel-item">
                  <figure class="carousel-inner__images">
                    <img src="/img/slider-img3.jpg" alt="3d slider image">
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  `;

  return (htmlElem.innerHTML = view);
}

export function afterRenderMainPage(): void {
  const carouselContainerElem: HTMLElement | null = document.querySelector('.carousel-indicators');
  const carouselImageContainerElem = document.querySelectorAll('.carousel-item');
  const carouselItemElem = document.querySelectorAll('.carousel__indicators-item');
  carouselContainerElem?.addEventListener('click', (event) => {
    if (event.target instanceof HTMLLIElement) {
      if (event.target.dataset.target === 'carouselIndicators') {
        const targetDataNumber = event.target.dataset.slideTo;
        carouselImageContainerElem?.forEach(removeActiveClass);
        if (targetDataNumber) {
          addActiveClass(carouselImageContainerElem[+targetDataNumber]);
        }
        carouselItemElem.forEach(removeActiveClass);
        if (targetDataNumber) {
          addActiveClass(carouselItemElem[+targetDataNumber]);
        }
      }
    }
  });

  function removeActiveClass(element: Element): void {
    element.classList.remove('active');
  }
  function addActiveClass(element: Element): void {
    element.classList.add('active');
  }
}
export default mainPage;
