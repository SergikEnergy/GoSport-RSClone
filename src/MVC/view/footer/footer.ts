import { createElement } from '../template/createElement';

export const renderFooter = (parent: HTMLElement):void => {
  const footer = createElement('footer', parent, 'footer');
  const wrapper = createElement('div', footer, 'wrapper footer__wrapper');
  const yearBlock = createElement('div', wrapper,'year-block');
  const symbol = createElement('span', yearBlock);
  symbol.textContent = '©';
  const yearText = createElement('span', yearBlock);
  yearText.textContent = '2023';
  const blockDevLinks = createElement('div', wrapper,'links-block');
  const firstLink = createElement('a', blockDevLinks, 'links-block__item');
  firstLink.setAttribute('href', 'https://github.com/Slava137');
  firstLink.textContent = 'Slava137';
  const secondLink = createElement('a', blockDevLinks, 'links-block__item');
  secondLink.setAttribute('href', 'https://github.com/SergikEnergy');
  secondLink.textContent = 'SergikEnergy';
  const thirdLink = createElement('a',blockDevLinks, 'links-block__item');
  thirdLink.setAttribute('href', 'https://github.com/vladboisa');
  thirdLink.textContent = 'VladBoisa';
  const rssLink = createElement('a', wrapper, 'link-rss');
  rssLink.setAttribute('href', 'https://rs.school/js/');
}