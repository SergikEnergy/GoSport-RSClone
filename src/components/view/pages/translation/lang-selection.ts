import { dataRu } from './data-ru';
import { dataEn } from './data-en';

export default class SelectionLang {
  dataArr = [dataRu, dataEn];
  lang!: number | null;

  determinationLanguage() {
    if (localStorage.getItem('lang')) {
      this.lang = Number(localStorage.getItem('lang'));
    } else {
      localStorage.setItem('lang', '0')
      this.lang = 0;
    }
    return this.lang;
  }
  
}